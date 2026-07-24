// POST /api/guardar — publica contenido nuevo (requiere x-admin-key)
import { put } from "@vercel/blob";

const LIMITE_BYTES = 4 * 1024 * 1024;

// Usamos el ID del store (BLOB2_STORE_ID) en vez de un token copiado a
// mano. Vercel autentica automáticamente por detrás porque el proyecto
// ya está conectado al Blob (OIDC) — no hay texto largo que pegar mal.
const STORE_ID = process.env.BLOB2_STORE_ID;

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Método no permitido" });
  }

  if (!process.env.ADMIN_KEY) {
    return res.status(500).json({
      error: "Falta configurar ADMIN_KEY en Vercel (Settings → Environment Variables).",
    });
  }
  if (req.headers["x-admin-key"] !== process.env.ADMIN_KEY) {
    return res.status(401).json({ error: "Clave incorrecta." });
  }
  if (!STORE_ID) {
    return res.status(500).json({
      error: "Falta la variable BLOB2_STORE_ID en Vercel. Revisa que el Blob público " +
             "(automundo-datos2) esté conectado a este proyecto y vuelve a desplegar.",
    });
  }

  let body = req.body;
  if (typeof body === "string") {
    try { body = JSON.parse(body); } catch { body = null; }
  }
  if (!body || typeof body !== "object") {
    return res.status(400).json({ error: "Contenido inválido." });
  }

  const texto = JSON.stringify(body);
  if (texto.length > LIMITE_BYTES) {
    return res.status(413).json({
      error: `El contenido pesa ${Math.round((texto.length / 1024 / 1024) * 10) / 10} MB, ` +
             `y el límite es 4 MB. Comprime o quita algunas fotos.`,
    });
  }

  try {
    const blob = await put("contenido.json", texto, {
      access: "public",
      contentType: "application/json",
      addRandomSuffix: false,
      allowOverwrite: true,
      storeId: STORE_ID,
    });
    return res.status(200).json({ ok: true, url: blob.url });
  } catch (err) {
    console.error("Error guardando contenido:", err);
    return res.status(500).json({
      error: "No se pudo guardar. Detalle: " + (err?.message || String(err)),
    });
  }
}
