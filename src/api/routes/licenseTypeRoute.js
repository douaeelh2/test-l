import { BASE_URL_API } from "@config/config";

export const LICENSE_TYPE_ROUTES = {
  GET_ALL: `${BASE_URL_API}/license-types`,
  GET_NAMES: `${BASE_URL_API}/license-types/names`,
  CREATE: `${BASE_URL_API}/license-types`,
  UPDATE: id => `${BASE_URL_API}/license-types/${id}`,
  DELETE: id => `${BASE_URL_API}/license-types/${id}`,
};
