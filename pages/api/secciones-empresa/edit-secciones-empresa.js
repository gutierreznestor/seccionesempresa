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
      UPDATE secciones_empresa
      SET Nombre = ?
      WHERE idSeccionEmpresa = ?
      `,
      [Nombre, id],
    )

    return res.status(200).json(results)
  } catch (e) {
    res.status(500).json({ errorMessage: e.message })
  }
}

export default handler
