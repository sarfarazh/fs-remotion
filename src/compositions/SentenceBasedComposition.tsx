import React from 'react';
import { AbsoluteFill, useVideoConfig } from 'remotion';
import { SubtitlesSentence } from '../components/SubtitlesSentence';
import { Slide } from '../components/Slide';
import { AudioComponent } from '../components/AudioComponent';
import { TransitionSeries, linearTiming } from '@remotion/transitions';
import { fade } from '@remotion/transitions/fade';
import { getSlides } from '../getSlides';
import transcription from '../../public/transcription.json';

export const SentenceBasedComposition: React.FC = () => {
  const { fps, durationInFrames } = useVideoConfig();
  
  const slides = getSlides();
  const slideDuration = Math.floor(durationInFrames / slides.length); // Adjust to cover entire video

  return (
    <AbsoluteFill>
      <TransitionSeries>
        {Array(Math.ceil(durationInFrames / slideDuration))
          .fill(0)
          .map((_, index) => (
            <React.Fragment key={index}>
              <TransitionSeries.Sequence durationInFrames={slideDuration}>
                <Slide src={slides[index % slides.length]} />
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
      <SubtitlesSentence transcription={transcription.transcription} />
    </AbsoluteFill>
  );
};
