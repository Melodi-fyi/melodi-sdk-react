import { Authentication } from "../auth/MelodiAuthProvider.types";
import { FeedbackCreateRequest } from "./feedback.types";

export async function saveFeedback(
  feedbackCreateRequest: FeedbackCreateRequest,
  authentication: Authentication
) {
  let headers = {};
  if (authentication.type === "ACCESS_TOKEN") {
    headers = {
      Authorization: `Bearer ${authentication.accessToken}`,
      "Content-Type": "application/json",
    };
  }

  let apiKeyParam = "";
  if (authentication.type === "API_KEY") {
    apiKeyParam = `?apiKey=${authentication.apiKey}`;
  }

  try {
    await fetch(`https://app.melodi.fyi/api/external/feedback${apiKeyParam}`, {
      method: "POST",
      headers,
      body: JSON.stringify(feedbackCreateRequest),
    });
  } catch (error) {
    console.log(error);
  }
}
