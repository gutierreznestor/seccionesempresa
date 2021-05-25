import React from 'react';
import Link from 'next/link';

const AppLink = ({ href, title }) => {
  return (
    <Link href={href}>
      <a>{title}</a>
    </Link>
  )
}

export default AppLink;
