import { query } from '../../../lib/db'

const handler = async (req, res) => {
  const { idEmpleado, DB } = req.body
  try {
    if (!idEmpleado) {
      return res
        .status(400)
        .json({ errorMessage: 'Se requiere el id del empleado.' })
    }
    const results = await query(
      `
      DELETE FROM empleados 
      WHERE idEmpleado = ?
      `,
      [idEmpleado],
      DB,
    )

    return res.json(results)
  } catch (e) {
    res.status(500).json({ errorMessage: e.message })
  }
}

export default handler
