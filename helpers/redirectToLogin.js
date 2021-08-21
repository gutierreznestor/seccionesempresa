import Router from 'next/router';

export const redirectToLogin = () => {
  return {
    redirect: {
      destination: "/login",
      permanent: false,
    },
    props: {},
  }
};
