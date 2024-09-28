import React from 'react';
import { useCurrentFrame, useVideoConfig, interpolate } from 'remotion';

// Define the type for each word in the transcription
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
}

export const SubtitlesWord: React.FC<SubtitlesWordProps> = ({ transcription }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const currentSentence = transcription.find(
    (sentence) => frame >= sentence.start * fps && frame <= sentence.end * fps
  );

  if (!currentSentence) {
    return null;
  }

  // Find the word being spoken based on frame
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
      {currentWord.word}
    </div>
  );
};
