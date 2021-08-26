import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import cookie from 'cookie';

import { query } from '../../../lib/db';

const handler = async (req, res) => {
  const { Usuario, Password, db } = req.body;
  if (!Usuario?.trim() || !Password?.trim()) {
    return res
      .status(400)
      .json({ errorMessage: 'Complete todos los campos.' })
  }

  const resultsUser = await query(
    `
    SELECT idUsuario, Usuario, Password 
    FROM usuarios
    WHERE usuarios.Usuario=?;
    `,
    [Usuario],
    db,
  );

  if (!resultsUser?.length) {
    return res.status(401).json({ errorMessage: 'El usuario o la contraseña son inválidas.' });
  };
  try {
    const user = resultsUser[0];
    const resultsProfile = await query(`
      SELECT perfiles.idPerfil, perfiles.Nombre AS Perfil, IF(up.idUsuarioPerfil IS NULL, 'No', 'Sí') AS TienePerfil, up.idUsuario
      FROM perfiles
      LEFT JOIN usuarios_tiene_perfiles as up ON 
        (up.idPerfil = perfiles.idPerfil AND up.idUsuario=?)
      WHERE up.idUsuario IS NOT NULL
      GROUP BY perfiles.idPerfil   
      `,
      [user.idUsuario],
    );

    compare(Password, user.Password, function (err, result) {
      if (!result) {
        res.status(401).json({ errorMessage: 'El usuario o la contraseña son inválidas.*' });
      };
      if (!err && result) {
        const userPayload = {
          idUsuario: user.idUsuario,
          Usuario: user.Usuario,
          Perfiles: resultsProfile.map((result) => result.Perfil),
        }
        const claims = { user: userPayload };
        const jwt = sign(claims, 'secret', { expiresIn: '7d' });
        res.setHeader('Set-Cookie', cookie.serialize('auth', jwt, {
          httpOnly: true,
          secure: process.env.NODE_ENV !== 'development',
          sameSite: 'strict',
          maxAge: 604800,
          path: '/',
        }));
        res.status(201).json({ message: 'Bienvenido nuevamente.' });
      } else {
        res.status(401).json({ errorMessage: 'Algo salió mal.' });
      };
    });
  } catch (error) {
    res.json({ errorMessage: error.message });
  }
};

export default handler;
