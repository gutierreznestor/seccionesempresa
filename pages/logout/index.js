import React, { useEffect } from 'react';
import Router from 'next/router';
import { logout } from '../../services/auth.service';

const Logout = () => {

  useEffect(() => {
    const onLogout = async () => {
      await logout();
      console.log('Router');
      Router.push('/login')
    }
    onLogout()
  }, []);

  return <></>;
}

export default Logout;
