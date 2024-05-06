import { Authentication, TokenType } from '../auth/MelodiAuthProvider.types';
import { FeedbackCreateRequest } from './feedback.types';

export async function saveFeedback(
  feedbackCreateRequest: FeedbackCreateRequest,
  authentication: Authentication,
) {
  let headers = {};
  if (authentication.type === TokenType.ACCESS_TOKEN) {
    headers = {
      Authorization: `Bearer ${authentication.accessToken}`,
      'Content-Type': 'application/json',
    };
  }

  let apiKeyParam = '';
  debugger;
  if (authentication.type === TokenType.API_KEY) {
    apiKeyParam = `?apiKey=${authentication.apiKey}`;
  }

  try {
    const result = await fetch(`https://app.melodi.fyi/api/external/feedback${apiKeyParam}`, {
      method: 'POST',
      headers,
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
