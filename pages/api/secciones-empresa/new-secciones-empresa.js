import { query } from '../../../lib/db'

const handler = async (req, res) => {
  const { Nombre, DB } = req.body
  try {
    if (!Nombre) {
      return res
        .status(400)
        .json({ errorMessage: 'Se requiere el Nombre.' })
    }
    const results = await query(
      `
      INSERT INTO secciones_empresa (Nombre) 
      VALUES (?)
      `,
      [Nombre],
      DB,
    )

    return res.json(results)
  } catch (e) {
    res.status(500).json({ errorMessage: e.message })
  }
}

export default handler
