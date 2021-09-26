import getChildren from "./getChildren";

const getLastChild = async ({ db, CodigoPlan }) => {
  const children = await getChildren({ db, CodigoPlan });
  if (children.length) return children[children.length - 1];
  return null;
}

export default getLastChild;
