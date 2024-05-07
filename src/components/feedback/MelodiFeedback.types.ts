import { ReactNode } from 'react';
import { Sample, UserInfo } from '../../actions/feedback.types';

import { FeedbackType } from '../../actions/feedback.types';

type JSONValue = string | number | boolean | JSONObject | JSONArray;

export interface JSONObject {
  [x: string]: JSONValue;
}

interface JSONArray extends Array<JSONValue> {}

export interface MelodiFeedbackWidgetProps {
  sample: Sample;
  companyName?: string;
  userInfo?: UserInfo;
}
export interface FeedbackPopoverProps {
  companyName?: string;
  feedbackType: FeedbackType;
  headerText: string;
  sample: Sample;
  userInfo?: UserInfo;
  renderPopoverActivator: (open: boolean, submitted: boolean) => ReactNode;
}
