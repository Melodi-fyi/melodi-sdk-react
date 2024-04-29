import { UserInfo } from "../../actions/feedback.types";

export interface MelodiFeedbackProps {
  buttonText?: string;
  companyName: string;
  disabled?: boolean;
  output?: string;
  userInfo?: UserInfo;
}
