
# Remotion Video Generation Project

## Project Overview

This project leverages Remotion to generate videos programmatically. The project is structured to support two different types of subtitle animations: 
1. **Word-Based Composition** - Animates subtitles word by word.
2. **Sentence-Based Composition** - Animates subtitles sentence by sentence.

The project is integrated with **TailwindCSS** for styling, **Google Fonts** for custom fonts, and includes customizable video settings via a `video-settings.json` file.

## Table of Contents

- [Getting Started](#getting-started)
  - [Pre-requisites](#pre-requisites)
  - [Installation](#installation)
  - [File Structure](#file-structure)
  - [Running the Project](#running-the-project)
- [Customization](#customization)
  - [Video Settings](#video-settings)
  - [Fonts](#fonts)
  - [Subtitles](#subtitles)
- [Exporting Videos](#exporting-videos)
- [Developer Notes](#developer-notes)

## Getting Started

### Pre-requisites

Ensure you have the following installed on your machine:

- **Node.js** (>= v14)
- **npm** or **yarn**
- **Remotion CLI** (for rendering videos)

### Installation

Clone the project and navigate into the directory:

```bash
git clone https://github.com/your-repo/fs-remotion4.git
cd fs-remotion4
```

Install the project dependencies:

```bash
npm install
```

or

```bash
yarn install
```

### File Structure

```
/fs-remotion4
│
├── /public
│   ├── transcription.json              # Transcription data for subtitles
│   ├── video-settings.json             # Customizable settings for the video
├── /src
│   ├── /components                     # React components
│   │   ├── AudioComponent.tsx          # Component for adding audio to the video
│   │   ├── SubtitlesSentence.tsx       # Subtitles component for sentence-based composition
│   │   ├── SubtitlesWord.tsx           # Subtitles component for word-based composition
│   ├── /compositions
│   │   ├── SentenceBasedComposition.tsx # Main composition for sentence animation
│   │   ├── WordBasedComposition.tsx     # Main composition for word animation
│   ├── getSlides.ts                    # Helper to load image slides dynamically
│   ├── RemotionRoot.tsx                # Register compositions
│   ├── index.ts                        # Entry point for the project
├── remotion.config.ts                  # Remotion configuration for Tailwind and Webpack
├── tailwind.config.js                  # TailwindCSS configuration
├── postcss.config.js                   # PostCSS configuration
├── package.json                        # Project dependencies and scripts
```

### Running the Project

To preview the compositions in Remotion Studio:

```bash
npx remotion studio
```

This will start a local development server where you can preview the video compositions.

## Customization

### Video Settings

The project uses a `video-settings.json` file located in the `/public` folder to define customizable properties for the video, such as font, size, colors, subtitle position, and watermark usage.

```json
{
  "word_composition": {
    "subtitle_font": "Anton",
    "subtitle_font_size": 60,
    "subtitle_color": "#FBBF24",
    "highlight_color": "#FFFF00",
    "watermark": false,
    "subtitle_position": "bottom",
    "subtitle_textAlign": "center"
  },
  "sentence_composition": {
    "subtitle_font": "Lobster",
    "subtitle_font_size": 40,
    "subtitle_color": "#FFFFFF",
    "highlight_color": "#FFFF00",
    "watermark": true,
    "subtitle_position": "top",
    "subtitle_textAlign": "center"
  }
}
```

### Fonts

The project uses **Google Fonts** via the `@remotion/google-fonts` package. You can specify a Google Font name in the `video-settings.json` file to load and use it in the compositions.

Example for using **Lobster**:

```json
"subtitle_font": "Lobster"
```

### Subtitles

Subtitles can be animated either by **Word** or **Sentence**. The `transcription.json` file located in the `/public` folder is used to define the subtitles.

Example structure of `transcription.json`:

```json
[
  {
    "sentence": "This is the first sentence.",
    "start": 0.5,
    "end": 3.0,
    "words": [
      {
        "word": "This",
        "start": 0.5,
        "end": 1.0
      },
      {
        "word": "is",
        "start": 1.0,
        "end": 1.5
      }
    ]
  }
]
```

The `start` and `end` fields indicate when the sentence or word should appear on the screen.

## Exporting Videos

To export the video as an MP4, use the Remotion CLI with the following command:

```bash
npx remotion render src/index.ts WordBasedComposition out/word-video.mp4
```

For sentence-based composition:

```bash
npx remotion render src/index.ts SentenceBasedComposition out/sentence-video.mp4
```

This will render the videos and output them to the `out/` folder.

## Developer Notes

### Adding New Compositions

To add a new composition, you can define a new composition in `RemotionRoot.tsx` and register it similarly to the existing ones:

```tsx
import { Composition } from 'remotion';
import { NewComposition } from './compositions/NewComposition';

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="NewComposition"
      component={NewComposition}
      durationInFrames={1500}  // Adjust based on your video requirements
      fps={30}
      width={1080}
      height={1920}
    />
  );
};
```

### Customizing with TailwindCSS

You can use **TailwindCSS** classes directly in your components by adding them to the className attribute.

For example, to apply a Tailwind background color to a subtitle:

```tsx
<div className="bg-yellow-500 text-center">
  {currentWord.word}
</div>
```

### Troubleshooting

- **Google Fonts not loading**: Ensure the correct font name is used in the `video-settings.json` file.
- **Video rendering issues**: Make sure your `transcription.json` has valid `start` and `end` timings for subtitles.
- **registerRoot() was called more than once**: Ensure that `registerRoot()` is only called once in `src/index.ts`.

### Additional Resources

- [Remotion Documentation](https://remotion.dev/docs)
- [TailwindCSS Documentation](https://tailwindcss.com/docs)
- [Google Fonts](https://fonts.google.com/)

---

Feel free to modify the `video-settings.json` file and `transcription.json` to experiment with different customizations.
