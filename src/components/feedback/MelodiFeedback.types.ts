import { ReactNode } from 'react';
import { Sample, UserInfo } from '../../actions/feedback.types';

import { FeedbackType } from '../../actions/feedback.types';

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
