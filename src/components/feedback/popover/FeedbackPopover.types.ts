import { ReactNode } from 'react';
import { FeedbackType } from '../../../actions/feedback.types';
import { Sample, UserInfo } from '../MelodiFeedbackWidget.types';

export interface FeedbackPopoverProps {
  companyName?: string;
  feedbackType: FeedbackType;
  headerText: string;
  sample: Sample;
  userInfo?: UserInfo;
  renderPopoverActivator: (open: boolean, submitted: boolean) => ReactNode;
}
