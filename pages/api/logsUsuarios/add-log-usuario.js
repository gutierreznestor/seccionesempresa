import { query } from '../../../lib/db';

const handler = async (req, res) => {
  const { DB, idUsuario, Operacion, Descripcion } = req.body;
  try {
    if (!idUsuario?.toString().trim() || !Operacion?.trim() || !Descripcion?.trim()) {
      return res
        .status(400)
        .json({ errorMessage: 'Complete todos los campos.' })
    }
    const results = await query(
      `
      INSERT INTO logs_usuarios(idUsuario, Operacion, Descripcion) 
      VALUES (?, ?, ?);
      `,
      [idUsuario, Operacion, Descripcion],
      DB,
    );

    return res.status(201).json(results)
  } catch (e) {
    res.status(400).json({ errorMessage: e.message })
  }
}

export default handler
