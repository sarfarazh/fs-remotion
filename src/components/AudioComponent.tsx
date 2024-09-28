import { Audio, staticFile } from 'remotion';

export const AudioComponent: React.FC = () => {
  return <Audio src={staticFile('summary.mp3')} volume={1} />;
};
