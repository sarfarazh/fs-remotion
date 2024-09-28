import { Composition } from 'remotion';
import { VideoComposition } from './Composition';
import transcription from '../public/transcription.json';

// Define types for the transcription data
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

// Function to calculate the total duration of the video based on transcription
const calculateTotalDurationInFrames = (transcription: Sentence[], fps: number): number => {
  const lastSubtitle = transcription[transcription.length - 1];
  const totalDurationInSeconds = lastSubtitle.end;
  return Math.floor(totalDurationInSeconds * fps);
};

export const RemotionRoot: React.FC = () => {
  const fps = 30;  // Set your FPS
  const durationInFrames = calculateTotalDurationInFrames(transcription.transcription, fps);

  return (
    <Composition
      id="VideoComposition"
      component={VideoComposition}
      durationInFrames={durationInFrames}  // Dynamic duration based on transcription
      fps={fps}
      width={1920}
      height={1080}
    />
  );
};
