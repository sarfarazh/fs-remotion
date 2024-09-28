import React, { useEffect, useState } from 'react';
import { AbsoluteFill, useVideoConfig, continueRender, delayRender } from 'remotion';
import { SubtitlesSentence } from '../components/SubtitlesSentence';
import { Slide } from '../components/Slide';
import { AudioComponent } from '../components/AudioComponent';
import { TransitionSeries, linearTiming } from '@remotion/transitions';
import { fade } from '@remotion/transitions/fade';
import transcription from '../../public/transcription.json';  // Import transcription data
import videoSettings from '../../public/video_settings.json'; // Import video settings
import { getSlides } from '../getSlides';
import { loadFont } from '@remotion/google-fonts/Lobster';  // Ensure the correct Google Font

export const SentenceBasedComposition: React.FC = () => {
  const { fps, durationInFrames } = useVideoConfig();
  const [handle] = useState(() => delayRender());

  useEffect(() => {
    // Load the font and notify when it's done
    const { waitUntilDone } = loadFont();
    waitUntilDone().then(() => {
      continueRender(handle);
    });
  }, [handle]);

  const position = videoSettings.sentence_composition.subtitle_position as 'top' | 'center' | 'bottom';
  const textAlign = videoSettings.sentence_composition.subtitle_textAlign as 'center' | 'left' | 'right';
  const slides = getSlides();
  const slideDuration = Math.floor(durationInFrames / slides.length);

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
      <SubtitlesSentence
        transcription={transcription.transcription}
        fontFamily={videoSettings.sentence_composition.subtitle_font}
        fontSize={videoSettings.sentence_composition.subtitle_font_size}
        color={videoSettings.sentence_composition.subtitle_color}
        position={position}
        textAlign={textAlign}
      />
    </AbsoluteFill>
  );
};
