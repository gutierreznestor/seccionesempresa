import cookies from '../../../helpers/cookies';

const handler = async (req, res) => {
  const { db } = req.body;
  res.cookie('db', db);
  res.end();
};

export default cookies(handler);
