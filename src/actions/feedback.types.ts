type JSONValue = string | number | boolean | JSONObject | JSONArray;

export interface JSONObject {
  [x: string]: JSONValue;
}

interface JSONArray extends Array<JSONValue> {}
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

export type FeedbackType = 'POSITIVE' | 'NEGATIVE';

export type FeedbackCreateRequest = {
  sample: Sample;
  feedback: {
    feedbackType: FeedbackType;
    feedbackText?: string;
  };
  user?: UserInfo;
};
