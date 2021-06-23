import React from 'react';
import Link from 'next/link';

import { StyledAnchor } from './AppLink.styled';

const AppLink = ({ href, title, enabled = true }) => {
  return (
    <Link href={href}>
      <StyledAnchor disabled={!enabled}>{title}</StyledAnchor>
    </Link>
  )
}

export default AppLink;
