import { verify } from 'jsonwebtoken';

export const isAllowed = (profilesAllowed = [], userProfile) => {
  let allow = false;
  profilesAllowed.map(allowed => {
    if (userProfile.find(p => p.includes(allowed))) {
      allow = true;
    }
  });
  return allow;
}


export const decodedJwt = async (jwt) => {
  return await verify(jwt, 'secret', async (err, decoded) => {
    return { err, user: decoded.user };
  });
}

export const authenticated = (fn) => async (req, res) => {
  try {
    verify(req.cookies.auth, 'secret', async (err, decoded) => {
      if (!err && decoded) {
        return await fn(req, res)
      }
      return res.status(401).json({ message: 'No estás autenticado.' })
    });
  } catch (err) {
    res.send(res, 500, 'Algo salió mal.')
  }
}
