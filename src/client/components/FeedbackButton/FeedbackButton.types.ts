import { MouseEventHandler } from "react";

export interface FeedbackButtonProps {
  buttonText?: string;
  disabled?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  output?: string;
}
