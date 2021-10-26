import React from 'react';
import Link from 'next/link';

import { StyledAnchor } from './AppLink.styled';

const AppLink = ({ href, title, enabled = true, bgColor }) => {
  return (
    <Link href={href}>
      <StyledAnchor
        disabled={!enabled}
        bgColor={bgColor}
        title={title}
      >{title}</StyledAnchor>
    </Link>
  )
}

export default AppLink;
