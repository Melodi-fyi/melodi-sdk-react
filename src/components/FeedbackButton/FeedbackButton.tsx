import React from "react";
import { FeedbackButtonProps } from "./FeedbackButton.types";

export function FeedbackButton(props: FeedbackButtonProps) {
  return (
    <button disabled={props.disabled} onClick={props.onClick}>
      {props.text || "Feedback"}
    </button>
  );
}
