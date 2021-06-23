import React from 'react';
import Link from 'next/link';

import { StyledAnchor } from './AppLink.styled';
import { isAllowed } from '../../hocs/auth';

const AppLink = ({ href, title, perfiles = [] }) => {
  const disabled = isAllowed(['supervisor'], perfiles)
  return (
    <Link href={href}>
      <StyledAnchor disabled={disabled}>{title}</StyledAnchor>
    </Link>
  )
}

export default AppLink;
