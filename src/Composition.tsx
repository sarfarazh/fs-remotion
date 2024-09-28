import React from 'react';
import { Audio, AbsoluteFill, staticFile, useVideoConfig } from 'remotion';
import { Subtitles } from './components/Subtitles';
import { TransitionSeries, linearTiming } from '@remotion/transitions';
import { Slide } from './components/Slide';
import { fade } from '@remotion/transitions/fade';
import transcription from '../public/transcription.json';

export const VideoComposition: React.FC = () => {
  const { fps, durationInFrames } = useVideoConfig();

  // Updated slide list
  const slides = [
    'slide_01.jpg',
    'slide_02.jpg',
    'slide_03.jpg',
    'slide_04.jpg',
  ];

  // Calculate how many frames per slide
  const slideDuration = Math.floor(durationInFrames / slides.length);

  return (
    <AbsoluteFill>
      <TransitionSeries>
        {Array(Math.ceil(durationInFrames / slideDuration)) // Repeat enough times to cover entire video duration
          .fill(0)
          .map((_, index) => (
            <React.Fragment key={index}>
              <TransitionSeries.Sequence durationInFrames={slideDuration}>
                <Slide src={staticFile(slides[index % slides.length])} />
              </TransitionSeries.Sequence>
              {index < Math.ceil(durationInFrames / slideDuration) - 1 && (
                <TransitionSeries.Transition
                  presentation={fade()}
                  timing={linearTiming({ durationInFrames: Math.floor(fps / 2) })}  // Adjust transition duration if necessary
                />
              )}
            </React.Fragment>
          ))}
      </TransitionSeries>
      <Audio src={staticFile('summary.mp3')} volume={1} />
      <Subtitles transcription={transcription.transcription} />
    </AbsoluteFill>
  );
};
