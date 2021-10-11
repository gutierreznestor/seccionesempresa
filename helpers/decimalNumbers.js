import { Decimal } from 'decimal.js-light';

// Adjust the global configuration if required (these are the defaults)
Decimal.set({
  precision: 20,
  rounding: Decimal.ROUND_HALF_UP,
  toExpNeg: -7,
  toExpPos: 21
});

export const newDecimal = (number) => {
  return new Decimal(number).toNumber();
}

export const minus = (number1, number2) => {
  console.log({ number1, number2 });
  return roundNumber({ number: new Decimal(number1).minus(roundNumber({ number: number2 })).toNumber() });
}

export const roundNumber = ({ number, precision = 2 }) => {
  if (!number) return 0;
  return new Decimal(number).todp(precision, 0).toNumber();
}
