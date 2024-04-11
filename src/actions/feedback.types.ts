export type Feedback = {
  feedbackType: "POSITVE" | "NEGATIVE" | "SKIP";
  feedbackText?: string;
  username: string;
  experimentId: number;
  sampleId: number;
};
