import { query } from '../../../lib/db'

const handler = async (req, res) => {
  const { Nombre, Apellido, idSeccionEmpresa } = req.body
  try {
    if (!Nombre) {
      return res
        .status(400)
        .json({ errorMessage: 'Complete todos los campos.' })
    }
    const results = await query(
      `
      INSERT INTO empleados (Nombre, Apellido, idSeccionEmpresa) 
      VALUES (?, ?, ?);
      `,
      [Nombre, Apellido, idSeccionEmpresa],
    )

    return res.json(results)
  } catch (e) {
    res.status(400).json({ errorMessage: e.message })
  }
}

export default handler
