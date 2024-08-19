import {
  CreateExternalUserRequest,
  CreateLogRequest,
  FeedbackType,
} from '@melodi/melodi-sdk-typescript';
import { ReactNode } from 'react';

export interface FeedbackPopoverProps {
  companyName?: string;
  feedbackType: FeedbackType;
  headerText: string;
  log: CreateLogRequest;
  userInfo?: CreateExternalUserRequest;
  renderPopoverActivator: (open: boolean, submitted: boolean) => ReactNode;
}
