import cookie from 'cookie';

const handler = async (req, res) => {
  res.setHeader('Set-Cookie', cookie.serialize('auth', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development',
    sameSite: 'strict',
    maxAge: -1,
    path: '/',
  }));

  res.writeHead(302, { Location: '/api/login' });
  res.end();
};

export default handler;
