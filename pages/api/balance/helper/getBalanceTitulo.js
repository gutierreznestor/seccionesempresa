import getChildren from '../../plan-cuentas/helpers/getChildren';

const getBalanceTitulo = async ({ db, titulo, SaldoInicial = 0, hash }) => {
  const children = await getChildren({ db, CodigoPlan: titulo.CodigoPlan });
  let Debitos = 0;
  let Creditos = 0;
  let Acumulado = 0;
  let SaldoCierre = 0;
  children.forEach(({ CodigoPlan }) => {
    Debitos += hash[CodigoPlan].Debitos;
    Creditos += hash[CodigoPlan].Creditos;
  });
  Acumulado = Debitos - Creditos;
  SaldoCierre = SaldoInicial + Acumulado;
  titulo.SaldoInicial = SaldoInicial;
  titulo.Debitos = Debitos;
  titulo.Creditos = Creditos;
  titulo.Acumulado = Acumulado;
  titulo.SaldoCierre = SaldoCierre;
  return titulo;
}

export default getBalanceTitulo;
