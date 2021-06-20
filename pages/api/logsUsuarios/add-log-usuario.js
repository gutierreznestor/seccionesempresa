import { query } from '../../../lib/db';

const handler = async (req, res) => {
  const { idUsuario, Operacion, Descripcion } = req.body;
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
    );

    return res.json(results)
  } catch (e) {
    res.status(400).json({ errorMessage: e.message })
  }
}

export default handler
