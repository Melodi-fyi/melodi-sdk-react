import { useContext } from "react";
import { MelodiFeedbackContext } from "../context/MelodiFeedbackContext";
import { FeedbackCreateRequest } from "./feedback.types";

export async function saveFeedback(
  feedbackCreateRequest: FeedbackCreateRequest
) {
  const context = useContext(MelodiFeedbackContext);

  const accessToken = context.accessToken;

  if (!accessToken) {
    console.error("Cannot save feedback as we have no access token provided.");
  }

  return await fetch("https://app.melodi.fyi/api/external/feedback", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(feedbackCreateRequest),
  });
}
