import { UserInfo } from '../components/feedback/MelodiFeedbackWidget.types';

export enum TokenType {
  API_KEY = 'API_KEY',
  ACCESS_TOKEN = 'ACCESS_TOKEN',
}

export type AccessTokenAuth = {
  type: TokenType.ACCESS_TOKEN;
  accessToken: string;
};

export type ApiKeyAuth = {
  type: TokenType.API_KEY;
  apiKey: string;
};

export type Authentication = ApiKeyAuth | AccessTokenAuth;

export interface MelodiFeedbackContext {
  authentication?: Authentication;
  userInfo?: UserInfo;
}

export interface MelodiAuthProviderProps {
  children: any;
  /* TODO Enable if support for accessToken auth is neededd
  accessTokenInfo?: {
    clientId: string;
    clientSecret: string;
    username: string;
  };*/
  apiKey: string;
}
