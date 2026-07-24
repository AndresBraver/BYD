// GET  /api/reservas → lista de horarios ocupados (público)
// POST /api/reservas → intenta apartar un horario (público, con folio único)
import { list, put } from "@vercel/blob";

const STORE_ID = process.env.BLOB2_STORE_ID;

async function leer() {
  if (!STORE_ID) return [];
  const { blobs } = await list({ prefix: "reservas.json", limit: 1, storeId: STORE_ID });
  const blob = blobs.find((b) => b.pathname === "reservas.json");
  if (!blob) return [];
  const r = await fetch(blob.url, { cache: "no-store" });
  if (!r.ok) return [];
  try { return await r.json(); } catch { return []; }
}

async function escribir(lista) {
  await put("reservas.json", JSON.stringify(lista), {
    access: "public",
    contentType: "application/json",
    addRandomSuffix: false,
    allowOverwrite: true,
    storeId: STORE_ID,
  });
}

export default async function handler(req, res) {
  try {
    if (req.method === "GET") {
      const lista = await leer();
      res.setHeader("Cache-Control", "no-store");
      return res.status(200).json(lista);
    }

    if (req.method === "POST") {
      if (!STORE_ID) {
        return res.status(500).json({ error: "Falta la variable BLOB2_STORE_ID en Vercel." });
      }
      let body = req.body;
      if (typeof body === "string") {
        try { body = JSON.parse(body); } catch { body = null; }
      }
      const { clave, tipo, nombre, tel, sucursal } = body || {};
      if (!clave || !nombre || !tel) {
        return res.status(400).json({ error: "Faltan datos de la cita." });
      }

      const lista = await leer();
      if (lista.some((r) => r.clave === clave)) {
        return res.status(409).json({ error: "Ese horario ya se acaba de apartar." });
      }
      lista.push({ clave, tipo, nombre, tel, sucursal, creada: new Date().toISOString() });
      await escribir(lista);
      return res.status(201).json({ ok: true });
    }

    res.setHeader("Allow", "GET, POST");
    return res.status(405).json({ error: "Método no permitido" });
  } catch (err) {
    console.error("Error en reservas:", err);
    return res.status(500).json({
      error: "No se pudo procesar la reserva. Detalle: " + (err?.message || String(err)),
    });
  }
}
