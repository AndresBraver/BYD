// GET /api/contenido — contenido publicado del sitio (público, sin clave)
import { list } from "@vercel/blob";

// En vez de copiar el token largo a mano (fácil de corromper al pegarlo
// en el iPad), usamos el ID del store — Vercel autentica solo por
// detrás para proyectos conectados (OIDC). BLOB2_STORE_ID ya está
// bien guardado en tus variables de entorno.
const STORE_ID = process.env.BLOB2_STORE_ID;

export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ error: "Método no permitido" });
  }

  if (!STORE_ID) {
    return res.status(200).json(null); // el sitio sigue con su respaldo
  }

  try {
    const { blobs } = await list({ prefix: "contenido.json", limit: 1, storeId: STORE_ID });
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
