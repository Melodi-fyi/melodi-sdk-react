import { MouseEventHandler } from "react";

export interface FeedbackButtonProps {
  text?: string;
  disabled?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}
