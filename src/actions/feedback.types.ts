export type Feedback = {
  feedbackType: "POSITIVE" | "NEGATIVE" | "SKIP";
  feedbackText?: string;
  username: string;
  experimentId: number;
  sampleId: number;
};
