import { CreateExternalUserRequest, CreateLogRequest } from '@melodi/melodi-sdk-typescript';
import { ReactNode } from 'react';

export interface FeedbackPopoverProps {
  companyName?: string;
  feedbackType: 'positive' | 'negative';
  headerText: string;
  log: CreateLogRequest;
  userInfo?: CreateExternalUserRequest;
  renderPopoverActivator: (open: boolean, submitted: boolean) => ReactNode;
}
