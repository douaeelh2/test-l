import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";

import { AUTH_ROUTES } from "@config/config";

export const useLogin = data => {
  return useMutation({
    mutationFn: async () => {
      const response = await axios.post(AUTH_ROUTES.LOGIN, data);
      return response.data;
    },
    onSuccess: data => {
      console.log("Login success:", data);
    },
    onError: error => {
      console.error("Login failed:", error);
    },
  });
};

export const useCreateUser = data => {
  return useMutation({
    mutationFn: async () => {
      const response = await axios.post(AUTH_ROUTES.CREATE_USER, data);
      return response.data;
    },
    onSuccess: data => {
      console.log("User created:", data);
    },
    onError: error => {
      console.error("User creation failed:", error);
    },
  });
};

export const useProfile = () => {
  return useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const response = await axios.get(AUTH_ROUTES.PROFILE);
      return response.data;
    },
    onSuccess: data => {
      console.log("Profile:", data);
    },
    onError: error => {
      console.error("Failed to fetch profile:", error);
    },
    enabled: !!localStorage.getItem("accessToken"),
  });
};

export const useChangePassword = data => {
  return useMutation({
    mutationFn: async () => {
      const response = await axios.post(AUTH_ROUTES.CHANGE_PASSWORD, data);
      return response.data;
    },
    onSuccess: data => {
      console.log("Password changed:", data);
    },
    onError: error => {
      console.error("Password change failed:", error);
    },
  });
};

export const useRefreshToken = () => {
  return useMutation({
    mutationFn: async () => {
      const response = await axios.post(AUTH_ROUTES.REFRESH_TOKEN, {});
      return response.data;
    },
    onSuccess: data => {
      console.log("Token refreshed:", data);
    },
    onError: error => {
      console.error("Token refresh failed:", error);
    },
  });
};
