const getNivel = (CodigoPlan) => {
  if (CodigoPlan === '') return 0;
  return CodigoPlan.split('.').length;
};

export default getNivel;
