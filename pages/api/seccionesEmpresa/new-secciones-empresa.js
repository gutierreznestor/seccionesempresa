import { query } from '../../../lib/db'

const handler = async (req, res) => {
  const { Nombre } = req.body
  try {
    if (!Nombre) {
      return res
        .status(400)
        .json({ message: 'Se requiere el Nombre en el cuerpo de la llamada.' })
    }
    const results = await query(
      `
      INSERT INTO secciones_empresa (Nombre) 
      VALUES (?)
      `,
      [Nombre],
    )

    return res.json(results)
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
}

export default handler