// POST /api/guardar
// Guarda el contenido editado en el panel. Requiere el header
// "x-admin-key" con el mismo valor que la variable de entorno
// ADMIN_KEY configurada en Vercel (Settings → Environment Variables).
import { put } from "@vercel/blob";

const LIMITE_BYTES = 4 * 1024 * 1024; // 4 MB — margen amplio para fotos en base64

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Método no permitido" });
  }

  const clave = req.headers["x-admin-key"];
  if (!process.env.ADMIN_KEY) {
    return res.status(500).json({
      error: "El sitio no tiene configurada la variable ADMIN_KEY en Vercel todavía.",
    });
  }
  if (clave !== process.env.ADMIN_KEY) {
    return res.status(401).json({ error: "Clave incorrecta." });
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
      error: `El contenido pesa ${Math.round(texto.length / 1024 / 1024 * 10) / 10} MB, ` +
             `y el límite es 4 MB. Comprime o quita algunas fotos.`,
    });
  }

  try {
    const blob = await put("contenido.json", texto, {
      access: "public",
      contentType: "application/json",
      addRandomSuffix: false,
      allowOverwrite: true,
    });
    return res.status(200).json({ ok: true, url: blob.url });
  } catch (err) {
    console.error("Error guardando contenido:", err);
    return res.status(500).json({ error: "No se pudo guardar. Intenta de nuevo." });
  }
}
