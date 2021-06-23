import React, { useEffect } from 'react';
import Router from 'next/router';
import { logout } from '../../services/auth.service';

const Logout = () => {

  useEffect(() => {
    const onLogout = async () => {
      await logout();
      Router.push('/login')
    }
    onLogout()
  }, []);

  return <></>;
}

export default Logout;
