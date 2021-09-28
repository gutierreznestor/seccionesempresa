import { query } from '../../../lib/db';

const handler = async (req, res) => {
  const { idUsuario, Operacion, Descripcion, DB } = req.body;
  try {
    if (!idUsuario?.toString().trim() || !Operacion?.trim() || !Descripcion?.trim()) {
      return res
        .status(400)
        .json({ errorMessage: 'Complete todos los campos.' })
    }
    const results = await query(
      `
      INSERT INTO logs_secciones_empresa(idUsuario, Operacion, Descripcion) 
      VALUES (?, ?, ?);
      `,
      [idUsuario, Operacion, Descripcion],
      DB,
    );

    return res.status(201).json(results)
  } catch (e) {
    ER_NO_REFERENCED_ROW_2
    const message = e.message.includes('ER_NO_REFERENCED_ROW_2') ? `El id del usuario no existe` : 'No se pudo agregar al log.';
    res.status(400).json({ errorMessage: message })
  }
}

export default handler
