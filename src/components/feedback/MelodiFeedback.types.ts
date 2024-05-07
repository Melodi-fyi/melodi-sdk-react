import { ReactNode } from 'react';
import { UserInfo } from '../../actions/feedback.types';

import { FeedbackType } from '../../actions/feedback.types';

type JSONValue = string | number | boolean | JSONObject | JSONArray;

export interface JSONObject {
  [x: string]: JSONValue;
}

interface JSONArray extends Array<JSONValue> {}

export interface MelodiFeedbackWidgetProps {
  output: string;
  companyName?: string;
  userInfo?: UserInfo;
  metadata?: JSONObject;
}
export interface FeedbackPopoverProps {
  companyName?: string;
  feedbackType: FeedbackType;
  headerText: string;
  output: string;
  userInfo?: UserInfo;
  metadata?: JSONObject;
  renderPopoverActivator: (open: boolean, submitted: boolean) => ReactNode;
}
