import { Feedback } from "./feedback.types";

export async function saveFeedback(feedback: Feedback, accessToken: string) {
  await fetch("https://app.melodi.fyi/api/external/feedback", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...feedback,
      feedbacktype: feedback.feedbackType,
      feedbacktext: feedback.feedbackText,
    }),
  });
}
