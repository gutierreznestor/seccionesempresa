import React from 'react';

const useScroll = () => {
  const ref = React.useRef(null);

  const scrollTo = () => {
    ref.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }

  return [ref, scrollTo];
}

export default useScroll;
