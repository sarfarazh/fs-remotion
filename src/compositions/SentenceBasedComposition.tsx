import React from 'react';
import { AbsoluteFill, staticFile, useVideoConfig } from 'remotion';
import { TransitionSeries, linearTiming } from '@remotion/transitions';
import { fade } from '@remotion/transitions/fade';
import { Slide } from '../components/Slide';
import { AudioComponent } from '../components/AudioComponent';
import { SubtitlesSentence } from '../components/SubtitlesSentence';
import transcription from '../../public/transcription.json';
import videoSettings from '../../public/video_settings.json'; // Import video settings

export const SentenceBasedComposition: React.FC = () => {
  const { fps, durationInFrames } = useVideoConfig();
  const slides = ['slide_01.jpg', 'slide_02.jpg', 'slide_03.jpg', 'slide_04.jpg'];

  const totalTransitionFrames = Math.floor(durationInFrames * 0.1);
  const totalImageDisplayFrames = durationInFrames - totalTransitionFrames;
  const displayTimePerImage = Math.floor(totalImageDisplayFrames / slides.length);

  const position = videoSettings.sentence_composition.subtitle_position as 'bottom' | 'center' | 'top';
  const textAlign = videoSettings.sentence_composition.subtitle_textAlign as 'center' | 'left' | 'right';

  return (
    <AbsoluteFill>
      <TransitionSeries>
        {Array(Math.ceil(durationInFrames / displayTimePerImage))
          .fill(0)
          .map((_, index) => (
            <React.Fragment key={index}>
              <TransitionSeries.Sequence durationInFrames={displayTimePerImage}>
                <Slide src={staticFile(slides[index % slides.length])} />
              </TransitionSeries.Sequence>
              {index < Math.ceil(durationInFrames / displayTimePerImage) - 1 && (
                <TransitionSeries.Transition
                  presentation={fade()}
                  timing={linearTiming({ durationInFrames: Math.floor(fps / 2) })}
                />
              )}
            </React.Fragment>
          ))}
      </TransitionSeries>

      {/* Pass customizable properties from video-settings.json */}
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
