import { Sample, UserInfo } from '../components/feedback/MelodiFeedbackWidget.types';

type JSONValue = string | number | boolean | JSONObject | JSONArray;

export interface JSONObject {
  [x: string]: JSONValue;
}

interface JSONArray extends Array<JSONValue> {}

export type FeedbackType = 'POSITIVE' | 'NEGATIVE';

export type FeedbackCreateRequest = {
  sample: Sample;
  feedback: {
    feedbackType: FeedbackType;
    feedbackText?: string;
  };
  user?: UserInfo;
};
