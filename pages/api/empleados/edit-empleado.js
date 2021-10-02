import { query } from '../../../lib/db'

const handler = async (req, res) => {
  const { id } = req.query;
  const { Nombre, Apellido, idSeccionEmpresa } = req.body;
  try {
    if (!Nombre) {
      return res
        .status(400)
        .json({ errorMessage: 'Se requiere el Nombre.' })
    }
    const results = await query(
      `
      UPDATE empleados
      SET Nombre = ?, Apellido = ?, idSeccionEmpresa = ?
      WHERE idEmpleado = ?
      `,
      [Nombre, Apellido, idSeccionEmpresa, id],
    )

    return res.status(200).json(results)
  } catch (e) {
    res.status(400).json({ errorMessage: 'No existe el id de la sección de empresa.' })
  }
}

export default handler
