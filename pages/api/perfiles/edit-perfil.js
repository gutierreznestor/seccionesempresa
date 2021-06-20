import { query } from '../../../lib/db'

const handler = async (req, res) => {
  const { id } = req.query;
  const { Nombre } = req.body;
  try {
    if (!Nombre) {
      return res
        .status(400)
        .json({ errorMessage: 'Se requiere el Nombre.' })
    }
    const results = await query(
      `
      UPDATE perfiles
      SET Nombre = ?
      WHERE idPerfil = ?
      `,
      [Nombre, id],
    )

    return res.json(results)
  } catch (e) {
    res.status(500).json({ errorMessage: e.message })
  }
}

export default handler
