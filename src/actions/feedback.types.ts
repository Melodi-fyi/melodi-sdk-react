export type User = {
  username: string;
};

export type SampleCreateRequest = {
  project: string;
  projectVersion: string;
  message?: string;
  response: string;
  title?: string;
};

export type FeedbackCreateRequest = {
  user: User;
  sample: SampleCreateRequest;
  feedback: {
    feedbackType: "POSITIVE" | "NEGATIVE";
    feedbackText?: string;
  };
};
