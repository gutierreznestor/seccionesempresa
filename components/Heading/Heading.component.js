import React from 'react';
import { getHeading } from './Heading.styled';

const Heading = ({ children, level = 2 }) => {
  const HeadingElement = getHeading(level);
  return <HeadingElement>{children}</HeadingElement>;
}

export default Heading;
