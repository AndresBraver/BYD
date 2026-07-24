// POST /api/guardar — publica contenido nuevo (requiere x-admin-key)
import { put } from "@vercel/blob";

const LIMITE_BYTES = 4 * 1024 * 1024;

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
    });
    return res.status(200).json({ ok: true, url: blob.url });
  } catch (err) {
    // Mostramos el motivo real (no un mensaje genérico) para poder
    // diagnosticarlo directo desde la pantalla del admin, sin tener
    // que buscar en los logs de Vercel.
    console.error("Error guardando contenido:", err);
    return res.status(500).json({
      error: "No se pudo guardar. Detalle: " + (err?.message || String(err)),
    });
  }
}
