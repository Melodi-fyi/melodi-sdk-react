import { CreateExternalUserRequest } from '@melodi/melodi-sdk-typescript';
import { AssociatedThreadOrIds } from './popover/FeedbackPopover.types';
export interface MelodiFeedbackWidgetProps {
  associatedThread: AssociatedThreadOrIds;
  companyName?: string;
  userInfo?: CreateExternalUserRequest;
}
