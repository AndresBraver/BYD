// GET /api/contenido
// Devuelve el contenido publicado del sitio (modelos, promos, agencias...).
// Es información pública: cualquier visitante la necesita para ver el sitio,
// así que este endpoint no pide clave.
import { list } from "@vercel/blob";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ error: "Método no permitido" });
  }

  try {
    const { blobs } = await list({ prefix: "contenido.json", limit: 1 });
    const blob = blobs.find((b) => b.pathname === "contenido.json");

    if (!blob) {
      // Todavía no se ha guardado nada desde el admin.
      return res.status(200).json(null);
    }

    const r = await fetch(blob.url, { cache: "no-store" });
    if (!r.ok) return res.status(200).json(null);

    const datos = await r.json();
    res.setHeader("Cache-Control", "no-store");
    return res.status(200).json(datos);
  } catch (err) {
    console.error("Error leyendo contenido:", err);
    // Si algo falla, el sitio público debe seguir funcionando con su
    // contenido de respaldo (DATOS_GUARDADOS), así que no tronamos aquí.
    return res.status(200).json(null);
  }
}
