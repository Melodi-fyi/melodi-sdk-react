import React from "react";
import { ButtonProps } from "./FeedbackButton.types";

export function Button(props: ButtonProps) {
  return (
    <button disabled={props.disabled} onClick={props.onClick}>
      {props.text || "Feedback"}
    </button>
  );
}
