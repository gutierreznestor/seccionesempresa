import styled from 'styled-components';

const H1Heading = styled.h1``;
const H2Heading = styled.h2``;
const H3Heading = styled.h3``;


const Headings = {
  '1': H1Heading,
  '2': H2Heading,
  '3': H3Heading,
};

export const getHeading = (level) => {
  return Headings[level];
};
