import { query } from '../../../lib/db'

const handler = async (req, res) => {
  const { Numero, Renglon, db } = req.body
  try {
    if (!Numero || !Renglon) {
      return res
        .status(400)
        .json({ errorMessage: 'Se requiere el Número y Renglón de asiento.' })
    }
    const results = await query(
      `
      DELETE FROM asientos 
      WHERE Numero = ? AND Renglon = ?
      `,
      [Numero, Renglon],
      db,
    )

    return res.json(results)
  } catch (e) {
    res.status(500).json({ errorMessage: e.message })
  }
}

export default handler
