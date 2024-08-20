import { CreateExternalUserRequest } from '@melodi/melodi-sdk-typescript';
import { AssociatedLogOrIds } from './popover/FeedbackPopover.types';
export interface MelodiFeedbackWidgetProps {
  associatedLog: AssociatedLogOrIds;
  companyName?: string;
  userInfo?: CreateExternalUserRequest;
}
