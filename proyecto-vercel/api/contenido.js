// GET /api/contenido — contenido publicado del sitio (público, sin clave)
import { list } from "@vercel/blob";

// Con dos Blobs conectados al proyecto, hay que decirle a la librería
// a cuál escribir/leer. BLOB2_... es el que Vercel creó al conectar
// el store público (automundo-datos2).
const TOKEN = process.env.BLOB2_READ_WRITE_TOKEN;

export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ error: "Método no permitido" });
  }

  if (!TOKEN) {
    return res.status(200).json(null); // el sitio sigue con su respaldo
  }

  try {
    const { blobs } = await list({ prefix: "contenido.json", limit: 1, token: TOKEN });
    const blob = blobs.find((b) => b.pathname === "contenido.json");
    if (!blob) return res.status(200).json(null);

    const r = await fetch(blob.url, { cache: "no-store" });
    if (!r.ok) return res.status(200).json(null);

    const datos = await r.json();
    res.setHeader("Cache-Control", "no-store");
    return res.status(200).json(datos);
  } catch (err) {
    console.error("Error leyendo contenido:", err);
    return res.status(200).json(null);
  }
}
