import { mainQuery } from '../../../lib/mainDb';

const handler = async (_, res) => {
  try {
    const results = await mainQuery(`
      SELECT DISTINCT DB, Nombre AS Empresa
      FROM empresas;
    `, null);
    res.status(200).json(results);
  } catch (e) {
    res.status(500).json({ errorMessage: e.message })
  }
}

export default handler;
