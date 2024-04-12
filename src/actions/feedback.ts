import { FeedbackCreateRequest } from "./feedback.types";

export async function saveFeedback(
  FeedbackCreateRequest: FeedbackCreateRequest,
  accessToken: string
) {
  await fetch("https://app.melodi.fyi/api/external/feedback", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      FeedbackCreateRequest,
    }),
  });
}
