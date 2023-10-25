import React from "react";
import { ButtonProps } from "./FeedbackButton.types";

export function FeedbackButton(props: ButtonProps) {
  return (
    <button disabled={props.disabled} onClick={props.onClick}>
      {props.text || "Feedback"}
    </button>
  );
}
