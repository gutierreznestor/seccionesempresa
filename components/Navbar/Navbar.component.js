import React from 'react';
import Link from 'next/link';

import { isAllowed } from '../../hocs/auth';
import { StyledNavbar } from './Navbar.styled';
import NoLink from '../NoLink/NoLink.component';


const Navbar = ({ user }) => {

  console.log({ Navbaruser: user });

  const links = [
    {
      label: 'Secciones empresa',
      url: '/secciones-empresa',
    },
    {
      label: 'Empleados',
      url: '/empleados',
    },
    {
      label: 'Usuarios',
      url: '/usuarios',
    },
    {
      label: 'Perfiles',
      url: '/perfiles',
    },
    {
      label: 'Auditoría',
      url: '/auditoria',
      disabled: isAllowed(['auditor'], user.Perfiles)
    },
    {
      label: 'Cerrar sesión',
      url: '/logout',
    },
  ];

  return (
    <StyledNavbar>
      <ul>
        {links.map(({ label, url, disabled }) => {
          const link = disabled ?
            <NoLink label={label} /> :
            <Link href={url}><a>{label}</a></Link>;
          return <li key={url}>{link}</li>
        })}
      </ul>
    </StyledNavbar>
  )
}

export default Navbar;
