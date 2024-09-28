import React from 'react';
import { AbsoluteFill, staticFile, useVideoConfig } from 'remotion';
import { SubtitlesWord } from '../components/SubtitlesWord';
import { Slide } from '../components/Slide';
import { AudioComponent } from '../components/AudioComponent';
import { TransitionSeries, linearTiming } from '@remotion/transitions';
import { fade } from '@remotion/transitions/fade';
import transcription from '../../public/transcription.json';

export const WordBasedComposition: React.FC = () => {
  const { fps, durationInFrames } = useVideoConfig();

  const slides = ['slide_01.jpg', 'slide_02.jpg', 'slide_03.jpg', 'slide_04.jpg'];
  const slideDuration = Math.floor(durationInFrames / slides.length);

  return (
    <AbsoluteFill>
      <TransitionSeries>
        {Array(Math.ceil(durationInFrames / slideDuration))
          .fill(0)
          .map((_, index) => (
            <React.Fragment key={index}>
              <TransitionSeries.Sequence durationInFrames={slideDuration}>
                <Slide src={staticFile(slides[index % slides.length])} />
              </TransitionSeries.Sequence>
              {index < Math.ceil(durationInFrames / slideDuration) - 1 && (
                <TransitionSeries.Transition
                  presentation={fade()}
                  timing={linearTiming({ durationInFrames: Math.floor(fps / 2) })}
                />
              )}
            </React.Fragment>
          ))}
      </TransitionSeries>
      <AudioComponent />
      <SubtitlesWord transcription={transcription.transcription} />
    </AbsoluteFill>
  );
};
