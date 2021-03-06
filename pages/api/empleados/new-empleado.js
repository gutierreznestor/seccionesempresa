import { query } from '../../../lib/db'

const handler = async (req, res) => {
  const { Nombre, Apellido, idSeccionEmpresa, DB } = req.body
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
      DB,
    )

    return res.status(201).json(results)
  } catch (e) {
    let message = e.message.includes('ER_NO_REFERENCED_ROW_2') ? `El id de la sección de empresa no existe` : e.message;
    res.status(400).json({ errorMessage: message })
  }
}

export default handler
