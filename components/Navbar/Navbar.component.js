import React from 'react';
import Link from 'next/link';

import { StyledNavbar } from './Navbar.styled';

const links = [
  {
    label: 'Home',
    url: '/',
  },
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
    label: 'Auditoria',
    url: '/auditoria',
  },
];

const Navbar = () => {
  return (
    <StyledNavbar>
      <ul>
        {links.map(({ label, url }) => (
          <li key={url}><Link href={url}><a>{label}</a></Link></li>
        ))}
      </ul>
    </StyledNavbar>
  )
}

export default Navbar;
