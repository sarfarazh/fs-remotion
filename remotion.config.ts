import { Config } from '@remotion/cli/config';

// Set concurrency for rendering (number of parallel Puppeteer instances)
Config.setConcurrency(8);

// Set the pixel format for the video output
Config.setPixelFormat('yuv444p');

// Set the codec for video output (e.g., h265 for HEVC)
Config.setCodec('h265');

// Optional: Set the output location of the video (relative to current directory)
Config.setOutputLocation('out/video.mp4');

// Optional: Set the public directory for static assets
Config.setPublicDir('./public');

// Optional: Set the studio port if needed
Config.setStudioPort(3003);

// Optional: Set caching enabled for faster rebuilds
Config.setCachingEnabled(true);

// Optional: Set video image format (either 'jpeg' or 'png')
Config.setVideoImageFormat('jpeg');

// Optional: Set log level for CLI (error, warn, info, verbose)
Config.setLevel('info');
