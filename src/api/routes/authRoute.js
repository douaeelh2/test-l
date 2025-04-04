import { BASE_URL_API } from "@config/config";

export const AUTH_ROUTES = {
  LOGIN: `${BASE_URL_API}/login`,
  CREATE_USER: `${BASE_URL_API}/create-user`,
  REFRESH_TOKEN: `${BASE_URL_API}/refresh-token`,
  PROFILE: `${BASE_URL_API}/profile`,
  CHANGE_PASSWORD: `${BASE_URL_API}/change-password`,
};
