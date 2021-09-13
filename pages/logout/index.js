import React, { useEffect } from 'react';
import useLogout from '../../customHooks/useLogout';

const Logout = () => {
  const { logout } = useLogout();

  useEffect(() => {
    logout()
  }, []);

  return <></>;
}

export default Logout;
