import { query } from '../../../lib/db'

const handler = async (req, res) => {
  const { id } = req.query;
  const { Nombre, Apellido, idSeccionEmpresa } = req.body;
  try {
    if (!Nombre) {
      return res
        .status(400)
        .json({ message: 'Se requiere el Nombre en el cuerpo de la llamada.' })
    }
    const results = await query(
      `
      UPDATE empleados
      SET Nombre = ?, Apellido = ?, idSeccionEmpresa = ?
      WHERE idEmpleado = ?
      `,
      [Nombre, Apellido, idSeccionEmpresa, id],
    )

    return res.json(results)
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
}

export default handler
