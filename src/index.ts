import { getCompositionsOnLambda, renderMediaOnLambda, getRenderProgress, presignUrl } from '@remotion/lambda/client';
import dotenv from 'dotenv';

dotenv.config();

const {
  REMOTION_AWS_REGION,
  REMOTION_LAMBDA_SERVE_URL,
  REMOTION_LAMBDA_FUNCTION_NAME,
} = process.env as {
  REMOTION_AWS_REGION: string;
  REMOTION_LAMBDA_SERVE_URL: string;
  REMOTION_LAMBDA_FUNCTION_NAME: string;
};

// Example inputProps that would come from your backend or be dynamic
const seriesId = 'example-series-id'; // dynamically provided
const jobId = 'example-job-id'; // dynamically provided
const audioKey = `fs-content-source/${seriesId}/${jobId}/summary.mp3`;
const transcriptionKey = `fs-content-source/${seriesId}/${jobId}/transcription.json`;

// Define the composition ID dynamically (could be passed from backend)
const compositionId = 'WordBasedComposition'; // or SentenceBasedComposition

async function renderVideo() {
  try {
    // Step 1: Get available compositions from the Lambda function
    const compositions = await getCompositionsOnLambda({
      region: REMOTION_AWS_REGION as 'us-east-1' | 'eu-central-1' | 'eu-west-1' | 'us-west-2',
      functionName: REMOTION_LAMBDA_FUNCTION_NAME,
      serveUrl: REMOTION_LAMBDA_SERVE_URL,
      inputProps: {},
    });

    // Find the desired composition by ID
    const selectedComposition = compositions.find(comp => comp.id === compositionId);
    if (!selectedComposition) {
      throw new Error(`Composition with ID ${compositionId} not found.`);
    }

    // Step 2: Render the media on Lambda
    const renderResult = await renderMediaOnLambda({
      region: REMOTION_AWS_REGION as 'us-east-1' | 'eu-central-1' | 'eu-west-1' | 'us-west-2',
      functionName: REMOTION_LAMBDA_FUNCTION_NAME,
      serveUrl: REMOTION_LAMBDA_SERVE_URL,
      composition: selectedComposition.id,
      codec: 'h264',
      inputProps: {
        seriesId,
        jobId,
        audioKey,
        transcriptionKey,
      },
      outName: `${seriesId}_${jobId}_video.mp4`,
      privacy: 'public',
    });

    console.log(`Render started with ID: ${renderResult.renderId}.`);

    // Step 3: Check render progress (optional)
    const progress = await getRenderProgress({
      renderId: renderResult.renderId,
      bucketName: renderResult.bucketName,
      functionName: REMOTION_LAMBDA_FUNCTION_NAME,
      region: REMOTION_AWS_REGION as 'us-east-1' | 'eu-central-1' | 'eu-west-1' | 'us-west-2',
    });

    console.log(`Current progress: ${progress.overallProgress * 100}%`);

    // Step 4: Presign the URL to get the final video download link (optional)
    const presignedUrl = await presignUrl({
      region: REMOTION_AWS_REGION as 'us-east-1' | 'eu-central-1' | 'eu-west-1' | 'us-west-2',
      bucketName: renderResult.bucketName,
      objectKey: `renders/${renderResult.renderId}/${seriesId}_${jobId}_video.mp4`,
      expiresInSeconds: 604800, // 7 days
      checkIfObjectExists: true,
    });

    if (presignedUrl) {
      console.log(`Presigned URL: ${presignedUrl}`);
    } else {
      console.error('Error: The file does not exist in the bucket.');
    }

  } catch (error) {
    console.error('Error during video rendering:', error);
  }
}

renderVideo();
