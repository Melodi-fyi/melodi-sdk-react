import React, { MouseEvent, useContext } from "react";
import { saveFeedback } from "../../../actions/feedback";
import { FeedbackCreateRequest } from "../../../actions/feedback.types";
import { MelodiFeedbackContext } from "../../context/MelodiFeedbackContext";
import { FeedbackButtonProps } from "./FeedbackButton.types";

export function FeedbackButton(props: FeedbackButtonProps) {
  const context = useContext(MelodiFeedbackContext);

  const accessToken = context.accessToken;

  if (!accessToken || !props.output) {
    return null;
  }

  async function handleClick(e: MouseEvent<HTMLButtonElement>) {
    if (props.onClick) {
      props.onClick(e);
    }

    if (accessToken && props.output) {
      const feedbackCreateRequest: FeedbackCreateRequest = {
        feedback: {
          feedbackType: "POSITIVE",
          feedbackText: "Sent from external api",
        },
        sample: {
          project: "External Feedback Project",
          projectVersion: "Version 1",
          response: props.output,
        },
      };

      await saveFeedback(feedbackCreateRequest, accessToken);
    }
  }

  return (
    <button disabled={props.disabled} onClick={handleClick}>
      {props.buttonText || "Feedback"}
    </button>
  );
}
