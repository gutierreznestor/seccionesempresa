import React from 'react';
import Link from 'next/link';

import { isAllowed } from '../../hocs/auth';
import { StyledNavbar, CurrentUserDiv } from './Navbar.styled';
import NoLink from '../NoLink/NoLink.component';
import { logout } from '../../services/auth.service';


const Navbar = ({ user = null }) => {

  const handleLogout = async () => {
    await logout();
  }

  const links = [
    {
      label: 'Secciones empresa',
      url: '/secciones-empresa',
      allowed: isAllowed(['auditor', 'supervisor', 'admin'], user?.Perfiles)
    },
    {
      label: 'Empleados',
      url: '/empleados',
      allowed: isAllowed(['auditor', 'supervisor', 'admin'], user?.Perfiles)
    },
    {
      label: 'Usuarios',
      url: '/usuarios',
      allowed: isAllowed(['auditor', 'supervisor', 'admin'], user?.Perfiles)
    },
    {
      label: 'Contabilidad',
      url: '/contabilidad',
      allowed: isAllowed(['auditor', 'supervisor', 'admin'], user?.Perfiles)
    },
    {
      label: 'Auditoría',
      url: '/auditoria',
      allowed: isAllowed(['auditor'], user?.Perfiles)
    },
    {
      label: 'Copias de seguridad',
      url: '/copias-seguridad',
      allowed: isAllowed(['supervisor', 'admin'], user?.Perfiles)
    },
    {
      label: 'Cerrar sesión',
      url: '/logout',
      onClick: { handleLogout },
      allowed: isAllowed(['auditor', 'supervisor', 'admin'], user?.Perfiles)
    },
  ];

  return (
    <div>
      <CurrentUserDiv>Usuario: <span>{user?.Usuario}</span></CurrentUserDiv>
      <StyledNavbar>
        <ul>
          {links.map(({ label, url, allowed, onClick = () => { } }) => {
            const link = allowed ?
              <Link href={url} onClick={onClick}><a>{label}</a></Link> :
              <NoLink label={label} />;
            return <li key={url}>{link}</li>
          })}
        </ul>
      </StyledNavbar>
    </div>
  )
}

export default Navbar;
