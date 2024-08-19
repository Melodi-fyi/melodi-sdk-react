import { FeedbackCreateRequest } from './feedback.types';

export async function saveFeedback(feedbackCreateRequest: FeedbackCreateRequest, apiKey: string) {
  try {
    const result = await fetch(`https://app.melodi.fyi/api/external/feedback?apiKey=${apiKey}`, {
      method: 'POST',
      headers: {},
      body: JSON.stringify(feedbackCreateRequest),
    });
    if (result.status === 200) {
      return await result.json();
    }
  } catch (error) {
    console.log(error);
  }

  return null;
}
