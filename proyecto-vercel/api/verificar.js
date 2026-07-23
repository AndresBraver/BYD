// POST /api/verificar
// El admin la llama justo al escribir la clave, para avisar de inmediato
// si está mal — sin esperar a que intentes guardar algo.
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
  return res.status(200).json({ ok: true });
}
