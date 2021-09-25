const getNextCodigoPlan = async ({ CodigoPlan }) => {
  const CodigoSplit = CodigoPlan.split('.');
  const lastNumberString = CodigoSplit[CodigoSplit.length - 1];
  const lastNumberInt = parseInt(lastNumberString);
  const nextNumber = lastNumberInt + 1;
  const prependZero = nextNumber < 10 ? '0' : '';
  const nextNumberString = prependZero + nextNumber.toString();
  CodigoSplit[CodigoSplit.length - 1] = nextNumberString;
  const nextCodigoPlan = CodigoSplit.join('.');
  return nextCodigoPlan;
}

export default getNextCodigoPlan;
