import editRegisterAsiento from '../asientos/helpers/editRegisterAsiento';
import getAsientosByNumero from '../asientos/helpers/getAsientosByNumero';
import newRegistro from './helper/newRegistro';

const handler = async (req, res) => {
  try {
    const { db, Numero } = req.body;
    if (!Numero) {
      return res
        .status(400)
        .json({ errorMessage: 'Se requiere el Número de asiento.' })
    }
    const results = await getAsientosByNumero({ db, Numero });
    const asientosPromises = [];
    const registerAsientoPromises = [];
    results.forEach(asiento => {
      console.log('asiento: ', asiento);
      asientosPromises.push(newRegistro({ db, ...asiento }));
      registerAsientoPromises.push(editRegisterAsiento({
        db,
        Numero: asiento.Numero,
        Renglon: asiento.Renglon,
        Registrado: 1,
      }));
    });
    await Promise.all(asientosPromises);
    await Promise.all(registerAsientoPromises);
    return res.status(200).json(results)
  } catch (e) {
    res.status(500).json({ errorMessage: e.message })
  }
}

export default handler;
