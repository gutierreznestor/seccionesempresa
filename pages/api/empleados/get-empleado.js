import { query } from '../../../lib/db'

const handler = async (req, res) => {
  try {
    const { id } = req.query;
    const results = await query(`
      SELECT DISTINCT empleados.Nombre, empleados.Apellido, 
        se.idSeccionEmpresa, se.Nombre AS Sección
      FROM empleados
      INNER JOIN secciones_empresa AS se ON 
        (se.idSeccionEmpresa = empleados.idSeccionEmpresa)
      WHERE idEmpleado=?  
      `,
      [id],
    );
    return res.status(200).json(results)
  } catch (e) {
    res.status(500).json({ errorMessage: e.message })
  }
}

export default handler
