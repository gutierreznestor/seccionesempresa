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

export const authenticated = (fn, allowed) => async (req, res) => {
  try {
    verify(req.cookies.auth, 'secret', async (err, decoded) => {
      if (!err && decoded) {
        if (isAllowed(allowed, decoded.user.Perfiles)) {
          return await fn(req, res)
        }
        return res.status(401).json({ message: 'No estás autorizado.' })
      }
      return res.status(401).json({ message: 'No estás autenticado.' })
    })
  } catch (err) {
    send(res, 500, 'My custom error!')
  }
}