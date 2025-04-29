import { CreateExternalUserRequest } from '@melodi/melodi-sdk-typescript';
import { Placement } from '@popperjs/core';
import { AssociatedThreadOrIds } from './popover/FeedbackPopover.types';
export interface MelodiFeedbackWidgetProps {
  associatedThread: AssociatedThreadOrIds;
  companyName?: string;
  userInfo?: CreateExternalUserRequest;
  variant?: 'thumbs' | 'flag';
  disablePortal?: boolean;
  placement?: Placement;
}
