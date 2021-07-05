import { query } from '../../../lib/db'

const handler = async (_, res) => {
  try {
    const results = await query(`
      SELECT DISTINCT idEmpleado, se.idSeccionEmpresa,
        se.Nombre AS Sección, 
        Apellido, emp.Nombre
      FROM empleados AS emp
      INNER JOIN secciones_empresa AS se ON 
        (se.idSeccionEmpresa = emp.idSeccionEmpresa)
      ORDER BY emp.idEmpleado DESC
    `);

    return res.json(results)
  } catch (e) {
    res.status(500).json({ errorMessage: e.message })
  }
}

export default handler
