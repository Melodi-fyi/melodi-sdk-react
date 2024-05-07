import { JSONObject } from '../../actions/feedback.types';

export type Sample = {
  project?: string;
  projectVersion?: string;
  input?: string;
  output: string;
  metadata?: JSONObject;
};

export type UserInfo = {
  id?: string;
  email: string;
};

export interface MelodiFeedbackWidgetProps {
  sample: Sample;
  companyName?: string;
  userInfo?: UserInfo;
}
