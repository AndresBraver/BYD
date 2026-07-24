// GET /api/contenido — contenido publicado del sitio (público, sin clave)
import { list } from "@vercel/blob";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ error: "Método no permitido" });
  }

  try {
    const { blobs } = await list({ prefix: "contenido.json", limit: 1 });
    const blob = blobs.find((b) => b.pathname === "contenido.json");
    if (!blob) return res.status(200).json(null);

    const r = await fetch(blob.url, { cache: "no-store" });
    if (!r.ok) return res.status(200).json(null);

    const datos = await r.json();
    res.setHeader("Cache-Control", "no-store");
    return res.status(200).json(datos);
  } catch (err) {
    console.error("Error leyendo contenido:", err);
    // No tronamos el sitio público por esto; sigue con su respaldo.
    return res.status(200).json(null);
  }
}
