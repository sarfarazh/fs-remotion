import { staticFile } from 'remotion';

// Function to retrieve slide filenames dynamically or from a predefined list
export const getSlides = (): string[] => {
  // You can list the slide files manually if they are in the public folder
  const slides = [
    staticFile('slide_01.jpg'),
    staticFile('slide_02.jpg'),
    staticFile('slide_03.jpg'),
    staticFile('slide_04.jpg'),
  ];

  // In the future, if you need to pull them from an API, you'd adjust this function accordingly
  return slides;
};
