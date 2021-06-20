import { compare } from 'bcrypt'

import { query } from '../../../lib/db';

const handler = async (req, res) => {
  const { Usuario, Password } = req.body;
  if (!Usuario?.trim() || !Password?.trim()) {
    return res
      .status(400)
      .json({ errorMessage: 'Complete todos los campos.' })
  }


  const results = await query(
    `
    SELECT Usuario, Password FROM usuarios
    WHERE usuarios.Usuario=?;
    `,
    [Usuario],
  );

  if (!results?.length) {
    return res.status(401).json({ errorMessage: 'El usuario o la contraseña son inválidas.' });
  };
  const user = results[0];
  compare(Password, user.Password, function (err, result) {
    if (!result) {
      return res.status(401).json({ errorMessage: 'El usuario o la contraseña son inválidas.' });
    }
    return res.status(201).json({ errorMessage: 'Inicio de sesión correcto.' });
    return res.json({ errorMessage: result })
    if (!err && result) {
      const claims = { sub: person.id, myPersonEmail: person.email };
      const jwt = sign(claims, secret, { expiresIn: '1h' });
      res.json({ authToken: jwt });
    } else {
      res.json({ errorMessage: 'Ups, something went wrong!' });
    }
  });
}

export default handler
