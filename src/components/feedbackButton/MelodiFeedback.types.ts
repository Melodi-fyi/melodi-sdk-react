import { ReactNode } from "react";
import { UserInfo } from "../../actions/feedback.types";

import { FeedbackTypeValues } from "../../actions/feedback.types";

export interface MelodiFeedbackProps {
  buttonText?: string;
  companyName: string;
  disabled?: boolean;
  output?: string;
  userInfo?: UserInfo;
}

export interface FeedbackButtonProps {
  companyName: string;
  feedbackType: FeedbackTypeValues;
  headerText: string;
  onSubmit(
    feedbackType: FeedbackTypeValues,
    feedbackText: string
  ): Promise<boolean>;
  popoverActivator: ReactNode;
  isSubmitting: boolean;
}
