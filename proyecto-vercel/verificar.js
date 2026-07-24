// POST /api/verificar — valida la clave del panel (requiere x-admin-key)
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
  return res.status(200).json({ ok: true });
}
