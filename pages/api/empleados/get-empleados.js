import { query } from '../../../lib/db'

const handler = async (_, res) => {
  try {
    const results = await query(`
      SELECT DISTINCT idEmpleado, se.idSeccionEmpresa,
        se.Nombre AS Seccion, 
        Apellido, emp.Nombre
      FROM empleados AS emp
      INNER JOIN secciones_empresa AS se ON 
        (se.idSeccionEmpresa = emp.idSeccionEmpresa)
      ORDER BY se.Nombre, emp.Apellido
    `);

    return res.json(results)
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
}

export default handler
