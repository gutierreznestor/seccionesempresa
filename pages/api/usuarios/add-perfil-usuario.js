import { hash } from 'bcrypt';
import { query } from '../../../lib/db';
import { getPerfilesUsuario } from '../../../services/usuarios.service';

const handler = async (req, res) => {
  const { idUsuario, idPerfil } = req.body;
  console.log({ idUsuario, idPerfil });
  try {
    if (!idUsuario?.trim() || !idPerfil?.trim()) {
      return res
        .status(400)
        .json({ errorMessage: 'Complete todos los campos.' })
    }
    const results = await query(
      `
      INSERT INTO usuarios_tiene_perfiles(idUsuario, idPerfil) 
      VALUES (?, ?);
      `,
      [idUsuario, idPerfil],
    );

    return res.json(results)
  } catch (e) {
    res.status(400).json({ errorMessage: e.message })
  }
}

export default handler
