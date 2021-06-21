import { verify } from 'jsonwebtoken';

const isAllowed = (profilesAllowed = [], userProfile) => {
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

export const authenticated = (fn, allowed) => async (req, res) => {
  try {
    const { err, decoded } = await decodedJwt(req.cookies.auth);
    if (!err && decoded) {
      if (isAllowed(allowed, decoded.user.Perfiles)) {
        return await fn(req, res)
      }
      return res.status(401).json({ message: 'No estás autorizado.' })
    }
    return res.status(401).json({ message: 'No estás autenticado.' })
  } catch (err) {
    res.send(res, 500, 'Algo salió mal.')
  }
}
