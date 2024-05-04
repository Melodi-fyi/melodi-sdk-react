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

export type FeedbackType = "POSITIVE" | "NEGATIVE";

export type FeedbackCreateRequest = {
  sample: SampleCreateRequest;
  feedback: {
    feedbackType: FeedbackType;
    feedbackText?: string;
  };
  user?: UserInfo;
};
