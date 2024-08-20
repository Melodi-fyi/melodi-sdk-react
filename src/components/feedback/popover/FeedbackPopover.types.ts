import { CreateExternalUserRequest, CreateLogRequest } from '@melodi/melodi-sdk-typescript';
import { ReactNode } from 'react';

export type AssociatedLogIds = {
  threadId: string;
  messageId: string;
};

export type AssociatedLogOrIds = CreateLogRequest | AssociatedLogIds;
export interface FeedbackPopoverProps {
  companyName?: string;
  feedbackType: 'positive' | 'negative';
  headerText: string;
  associatedLog: AssociatedLogOrIds;
  userInfo?: CreateExternalUserRequest;
  renderPopoverActivator: (open: boolean, submitted: boolean) => ReactNode;
}
