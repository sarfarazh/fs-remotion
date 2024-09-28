import React from 'react';
import { Img } from 'remotion';

export const Slide: React.FC<{ src: string }> = ({ src }) => {
  return (
    <Img
      src={src}
      style={{
        width: '100%',
        height: '100%',
        objectFit: 'cover',  // This ensures images fill the frame without skewing
      }}
    />
  );
};
