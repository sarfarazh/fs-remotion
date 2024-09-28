import React from 'react';
import { useCurrentFrame, useVideoConfig, interpolate } from 'remotion';

interface Word {
  word: string;
  start: number;
  end: number;
}

interface Sentence {
  sentence: string;
  start: number;
  end: number;
  words: Word[];
}

interface SubtitlesWordProps {
  transcription: Sentence[];
  fontFamily: string;
  fontSize: number;
  color: string;
  position: 'bottom' | 'center' | 'top';
  textAlign: 'center' | 'left' | 'right';
}

export const SubtitlesWord: React.FC<SubtitlesWordProps> = ({
  transcription,
  fontFamily,
  fontSize,
  color,
  position,
  textAlign,
}) => {
  const frame = useCurrentFrame();
  const { fps} = useVideoConfig();

  const currentSentence = transcription.find(
    (sentence) => frame >= sentence.start * fps && frame <= sentence.end * fps
  );

  if (!currentSentence) {
    return null;
  }

  const currentWord = currentSentence.words.find(
    (word) => frame >= word.start * fps && frame <= word.end * fps
  );

  if (!currentWord) {
    return null;
  }

  const opacity = interpolate(frame, [currentWord.start * fps, currentWord.end * fps], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Function to calculate subtitle position dynamically
  // Remove 'height' since it's declared but not used.
    const subtitlePosition = () => {
      switch (position) {
        case 'top':
          return { top: '20%' };
        case 'center':
          return { top: '50%', transform: 'translateY(-50%)' };
        case 'bottom':
        default:
          return { bottom: '20%' };
      }
    };


  return (
    <div
      style={{
        position: 'absolute',
        ...subtitlePosition(),
        width: '100%',
        textAlign: textAlign,
        fontFamily,
        fontSize: `${fontSize}px`,
        color,
        opacity,
      }}
    >
      {currentWord.word}
    </div>
  );
};
