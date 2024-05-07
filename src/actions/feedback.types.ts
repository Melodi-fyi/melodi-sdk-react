import { JSONObject } from '../components/feedback/MelodiFeedback.types';

export type Sample = {
  project?: string;
  projectVersion?: string;
  message?: string;
  response: string;
  title?: string;
  metadata?: JSONObject;
};

export type UserInfo = {
  id?: string;
  email: string;
};

export type FeedbackType = 'POSITIVE' | 'NEGATIVE';

export type FeedbackCreateRequest = {
  sample: Sample;
  feedback: {
    feedbackType: FeedbackType;
    feedbackText?: string;
  };
  user?: UserInfo;
};
