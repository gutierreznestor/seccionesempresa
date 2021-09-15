import React, { useEffect } from 'react';
import Layout from '../../components/Layout';
import useLogout from '../../customHooks/useLogout';

const Logout = () => {
  const { logout } = useLogout();

  useEffect(() => {
    logout()
  }, []);

  return <Layout hideNavbar title="Cerrando sesión..." />;
}

export default Logout;
