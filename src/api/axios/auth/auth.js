export const setTokens = (accessToken, refreshToken) => {
  localStorage.setItem("accessToken", accessToken);
  localStorage.setItem("refreshToken", refreshToken);
};

export const getAccessToken = () => {
  return localStorage.getItem("accessToken");
};

export const getRefreshToken = () => {
  return localStorage.getItem("refreshToken");
};

export const removeTokens = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
};

export const setPasswordChange = passwordChanged => {
  localStorage.setItem("passwordChanged", passwordChanged);
};

export const getPasswordChangedStatus = () => {
  return localStorage.getItem("passwordChanged") === "true";
};

export const isAuthenticated = () => {
  const token = getAccessToken();
  return !!token;
};
