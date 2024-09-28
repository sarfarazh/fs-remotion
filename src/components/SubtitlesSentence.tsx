import React from 'react';
import { useCurrentFrame, useVideoConfig, interpolate } from 'remotion';

export const SubtitlesSentence: React.FC<{ transcription: any[] }> = ({ transcription }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const currentSubtitle = transcription.find(
    (sentence) => frame >= sentence.start * fps && frame <= sentence.end * fps
  );

  if (!currentSubtitle) {
    return null;
  }

  const opacity = interpolate(frame, [currentSubtitle.start * fps, currentSubtitle.end * fps], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        position: 'absolute',
        bottom: '10%',
        width: '100%',
        textAlign: 'center',
        fontSize: '50px',
        color: 'white',
        opacity,
      }}
    >
      {currentSubtitle.sentence}
    </div>
  );
};
