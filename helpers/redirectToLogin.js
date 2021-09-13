import Router from 'next/router';

export const redirectToLogin = () => {
  return {
    redirect: {
      destination: "/seleccionar-empresa",
      permanent: false,
    },
    props: {},
  }
};
