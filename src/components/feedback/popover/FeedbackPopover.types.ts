import { CreateExternalUserRequest, CreateThreadRequest } from '@melodi/melodi-sdk-typescript';
import { ReactNode } from 'react';

export type AssociatedExternalThreadId = {
  externalThreadId: string;
};

export type AssociatedExternalMessageId = {
  externalThreadId: string;
  externalMessageId: string;
};

export type AssociatedIds = AssociatedExternalThreadId | AssociatedExternalMessageId;

export type AssociatedThreadOrIds = CreateThreadRequest | AssociatedIds;
export interface FeedbackPopoverProps {
  companyName?: string;
  feedbackType: 'positive' | 'negative';
  headerText: string;
  associatedThread: AssociatedThreadOrIds;
  userInfo?: CreateExternalUserRequest;
  renderPopoverActivator: (open: boolean, submitted: boolean) => ReactNode;
}
