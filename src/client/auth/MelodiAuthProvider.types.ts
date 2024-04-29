import { UserInfo } from "../../actions/feedback.types";

export type AccessTokenAuth = {
  type: "ACCESS_TOKEN";
  accessToken: string;
};

export type ApiKeyAuth = {
  type: "API_KEY";
  apiKey: string;
};

export type Authentication = AccessTokenAuth | ApiKeyAuth;

export interface MelodiFeedbackContext {
  authentication?: Authentication;
  userInfo?: UserInfo;
}

export interface MelodiAuthProviderProps {
  children: any;
  accessTokenInfo?: {
    clientId: string;
    clientSecret: string;
    username: string;
  };
  apiKeyInfo?: ApiKeyAuth;
}
