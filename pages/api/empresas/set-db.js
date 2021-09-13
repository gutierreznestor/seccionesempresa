import cookies from '../../../helpers/cookies';

const handler = async (req, res) => {
  const { db } = req.body;
  if (!db) {
    return res.status(400).json({
      errorMessage: 'No se envió la base de datos',
    });
  }
  res.cookie('db', db);
  res.status(200).json({
    message: 'Set db ok',
  })
};

export default cookies(handler);
