import { BASE_URL_API } from "@config/config";

export const LICENSE_ROUTES = {
  GET_ALL_LICENSES: `${BASE_URL_API}/licenses`,
  GET_LICENSE_BY_ID: id => `${BASE_URL_API}/licenses/${id}`,
  CREATE_LICENSE: `${BASE_URL_API}/licenses`,
  UPDATE_LICENSE: id => `${BASE_URL_API}/licenses/${id}`,
  DELETE_LICENSE: id => `${BASE_URL_API}/licenses/${id}`,
  EXTEND_LICENSE: id => `${BASE_URL_API}/licenses/extend/${id}`,
  GET_PREVIOUS_LICENSES: id => `${BASE_URL_API}/licenses/previous/${id}`,
  GET_ALL_AUDITS: `${BASE_URL_API}/licenses/audits`,
};
