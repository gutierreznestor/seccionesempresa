import cookies from '../../../helpers/cookies';

const handler = async (req, res) => {
  const { db } = req.body;
  res.cookie('db', db);
  res.status(200).json({
    message: 'Set db ok',
  })
};

export default cookies(handler);
