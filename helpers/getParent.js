const getParent = (CodigoPlan) => {
  const spl = CodigoPlan.split('.');
  return spl.slice(0, spl.length - 1).join('.');
};

export default getParent;
