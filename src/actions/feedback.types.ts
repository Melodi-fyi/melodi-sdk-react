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

export type FeedbackCreateRequest = {
  sample: SampleCreateRequest;
  feedback: {
    feedbackType: "POSITIVE" | "NEGATIVE";
    feedbackText?: string;
  };
  user?: UserInfo;
};
