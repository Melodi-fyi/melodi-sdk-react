import { UserInfo } from "../../../actions/feedback.types";

export interface FeedbackButtonProps {
  buttonText?: string;
  disabled?: boolean;
  output?: string;
  userInfo?: UserInfo;
}
