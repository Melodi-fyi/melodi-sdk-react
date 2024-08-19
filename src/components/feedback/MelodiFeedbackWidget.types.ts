import { CreateExternalUserRequest, CreateLogRequest } from '@melodi/melodi-sdk-typescript';
export interface MelodiFeedbackWidgetProps {
  log: CreateLogRequest;
  companyName?: string;
  userInfo?: CreateExternalUserRequest;
}
