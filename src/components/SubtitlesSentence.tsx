// src/components/SubtitlesSentence.tsx

import React from 'react';
import { useCurrentFrame, useVideoConfig, interpolate } from 'remotion';

interface Sentence {
  sentence: string;
  start: number;
  end: number;
}

interface SubtitlesSentenceProps {
  transcription: Sentence[];
  fontFamily: string;
  fontSize: number;
  color: string;
  position: 'top' | 'center' | 'bottom';
  textAlign: 'left' | 'center' | 'right';
}

export const SubtitlesSentence: React.FC<SubtitlesSentenceProps> = ({
  transcription,
  fontFamily,
  fontSize,
  color,
  position,
  textAlign,
}) => {
  const frame = useCurrentFrame();
  const { fps, height } = useVideoConfig();  // Access screen height to calculate position

  const currentSentence = transcription.find(
    (sentence) => frame >= sentence.start * fps && frame <= sentence.end * fps
  );

  if (!currentSentence) {
    return null;
  }

  const opacity = interpolate(
    frame,
    [currentSentence.start * fps, currentSentence.end * fps],
    [1, 0],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }
  );

  // Calculate the subtitle position based on the `subtitle_position` value
  const subtitlePosition = () => {
    switch (position) {
      case 'top':
        return { top: height * 0.2 };  // 1/20 screen height from top
      case 'center':
        return { top: '50%', transform: 'translateY(-50%)' };  // Vertically center
      case 'bottom':
      default:
        return { bottom: height * 0.2 };  // 1/20 screen height from bottom
    }
  };

  return (
    <div
      style={{
        position: 'absolute',
        width: '100%',
        textAlign,
        fontFamily,
        fontSize: `${fontSize}px`,
        color,
        opacity,
        ...subtitlePosition(),  // Apply the calculated position
      }}
    >
      {currentSentence.sentence}
    </div>
  );
};
