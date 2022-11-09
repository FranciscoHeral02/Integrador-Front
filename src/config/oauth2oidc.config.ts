import { AuthConfig } from 'angular-oauth2-oidc';

export const oauth2OidcConfig: AuthConfig = {
  issuer: 'http://oauth-server:9000/realms/OauthService',

  redirectUri: window.location.origin,

  clientId: 'integrador-oauth2-client',

  responseType: 'code',

  scope: 'openid',

  showDebugInformation: true,

  sessionChecksEnabled: false,

  timeoutFactor: 0.8,

  disablePKCE: false,

  requireHttps: false,

  clearHashAfterLogin: true,

  logoutUrl: window.location.origin,
};