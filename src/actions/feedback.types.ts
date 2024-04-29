export type SampleCreateRequest = {
  project: string;
  projectVersion: string;
  message?: string;
  response: string;
  title?: string;
};

export type UserInfo = {
  id?: string;
  email: string;
};

export type FeedbackTypeValues = "POSITIVE" | "NEGATIVE";

export type FeedbackCreateRequest = {
  sample: SampleCreateRequest;
  feedback: {
    feedbackType: FeedbackTypeValues;
    feedbackText?: string;
  };
  user?: UserInfo;
};
