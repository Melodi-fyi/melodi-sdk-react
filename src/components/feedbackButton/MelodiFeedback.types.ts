import { ReactNode } from "react";
import { UserInfo } from "../../actions/feedback.types";

import { FeedbackType } from "../../actions/feedback.types";

export interface MelodiFeedbackProps {
  output: string;
  companyName?: string;
  userInfo?: UserInfo;
}

export interface FeedbackButtonProps {
  companyName?: string;
  feedbackType: FeedbackType;
  headerText: string;
  onSubmit(feedbackType: FeedbackType, feedbackText: string): Promise<boolean>;
  popoverActivator: ReactNode;
  isSubmitting: boolean;
}
