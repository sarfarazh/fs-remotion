import { Composition } from 'remotion';
import { SentenceBasedComposition } from './compositions/SentenceBasedComposition';
import { WordBasedComposition } from './compositions/WordBasedComposition';

export const RemotionRoot: React.FC = () => {
  const fps = 30;
  
  // Assuming audio duration is exactly 52 seconds
  const audioDurationInSeconds = 52;
  const durationInFrames = audioDurationInSeconds * fps;

  return (
    <>
      {/* Register Sentence-Based Composition */}
      <Composition
        id="SentenceBasedComposition"
        component={SentenceBasedComposition}
        durationInFrames={durationInFrames}
        fps={fps}
        width={1080}
        height={1920}
      />

      {/* Register Word-Based Composition */}
      <Composition
        id="WordBasedComposition"
        component={WordBasedComposition}
        durationInFrames={durationInFrames}
        fps={fps}
        width={1080}
        height={1920}
      />
    </>
  );
};





// // src/Root.tsx

// import React from 'react';
// import './style.css'; // Import TailwindCSS
// import { Composition } from 'remotion';
// import { SentenceBasedComposition } from './compositions/SentenceBasedComposition';
// import { WordBasedComposition } from './compositions/WordBasedComposition';
// import transcription from '../public/transcription.json';

// export const RemotionRoot: React.FC = () => {
//   const fps = 30;
//   const durationInFrames = calculateTotalDurationInFrames(transcription.transcription, fps);

//   return (
//     <>
//       <Composition
//         id="WordBasedComposition"
//         component={WordBasedComposition}
//         durationInFrames={durationInFrames}
//         fps={fps}
//         width={1080}
//         height={1920}
//       />
//       <Composition
//         id="SentenceBasedComposition"
//         component={SentenceBasedComposition}
//         durationInFrames={durationInFrames}
//         fps={fps}
//         width={1080}
//         height={1920}
//       />
//     </>
//   );
// };

// // Helper function to calculate total duration in frames
// const calculateTotalDurationInFrames = (transcription: any[], fps: number) => {
//   return transcription.reduce((acc, sentence) => {
//     const sentenceDuration = Math.floor((sentence.end - sentence.start) * fps);
//     return acc + sentenceDuration;
//   }, 0);
// };
