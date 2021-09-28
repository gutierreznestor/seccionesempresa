import { query } from '../../../lib/db'

const handler = async (req, res) => {
  const { Nombre } = req.body
  try {
    if (!Nombre) {
      return res
        .status(400)
        .json({ errorMessage: 'Se requiere el Nombre.' })
    }
    const results = await query(
      `
      INSERT INTO perfiles (Nombre) 
      VALUES (?)
      `,
      [Nombre],
    )

    return res.status(201).json(results)
  } catch (e) {
    res.status(500).json({ errorMessage: e.message })
  }
}

export default handler
