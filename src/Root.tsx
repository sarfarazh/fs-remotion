import { Composition } from 'remotion';
import { SentenceBasedComposition } from './compositions/SentenceBasedComposition';
import { WordBasedComposition } from './compositions/WordBasedComposition';
import transcription from '../public/transcription.json';

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

export const RemotionRoot: React.FC = () => {
  const fps = 30;

  // Calculate total duration in frames using transcription data
  const durationInFrames = calculateTotalDurationInFrames(transcription.transcription, fps);

  return (
    <>
      {/* Register Sentence-Based Composition */}
      <Composition
        id="SentenceBasedComposition"
        component={SentenceBasedComposition}
        durationInFrames={durationInFrames}
        fps={fps}
        width={1920}
        height={1080}
      />

      {/* Register Word-Based Composition */}
      <Composition
        id="WordBasedComposition"
        component={WordBasedComposition}
        durationInFrames={durationInFrames}
        fps={fps}
        width={1920}
        height={1080}
      />
    </>
  );
};

// Helper function to calculate total duration in frames
const calculateTotalDurationInFrames = (transcription: Sentence[], fps: number): number => {
  // Find the end time of the last sentence in the transcription
  const lastSentence = transcription[transcription.length - 1];
  const lastWord = lastSentence.words[lastSentence.words.length - 1];

  // Calculate the total duration based on the end time of the last word
  const totalDurationInSeconds = lastWord.end;

  // Convert the duration in seconds to frames
  return Math.ceil(totalDurationInSeconds * fps);
};
