import { PublicClientApplication } from "@azure/msal-browser";

export const ROLES = {
  jobseeker: "Candidate",
  recruiter: "Recruiter",
  staff: ["staff_admin", "staff_maintainer", "staff_editor", "staff_viewer"],
};
// Azure Login
const azureClientID = process.env.VITE_MICROSOFT_CLIENT_ID;
export const msalConfig = {
  auth: {
    clientId: azureClientID,
    authority: "https://login.microsoftonline.com/common",
    redirectUri: "/",
    navigateToLoginRequestUri: false,
  },
  cache: {
    cacheLocation: "localStorage",
  },
};

export const msalInstance = new PublicClientApplication(msalConfig);
export const loginRequest = {
  scopes: ["openid", "profile", "User.Read", "Mail.Read"],
};

// Google authentication client ID
export const googleClientID = process.env.VITE_GOOGLE_AUTH_LOGIN;

// Google captcha ID
export const googleCaptchaID = process.env.VITE_RECAPTCHA_ID;
