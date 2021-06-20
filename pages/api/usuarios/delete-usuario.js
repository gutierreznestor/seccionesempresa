import { query } from '../../../lib/db'

const handler = async (req, res) => {
  const { id } = req.body
  try {
    if (!id) {
      return res
        .status(400)
        .json({ errorMessage: 'Se requiere el id del usuario.' })
    }
    const results = await query(
      `
      DELETE FROM usuarios
      WHERE idUsuario= ?
      `,
      [id],
    )

    return res.json(results)
  } catch (e) {
    res.status(500).json({ errorMessage: e.message })
  }
}

export default handler
