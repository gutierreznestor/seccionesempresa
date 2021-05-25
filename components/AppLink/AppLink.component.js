import React from 'react';
import Link from 'next/link';

import { StyledAnchor } from './AppLink.styled';

const AppLink = ({ href, title }) => {
  return (
    <Link href={href}>
      <StyledAnchor>{title}</StyledAnchor>
    </Link>
  )
}

export default AppLink;
