import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { LICENSE_ROUTES } from "@api/routes/licenseRoute";

import axiosInstance from "../axios/instance/axiosInstance";

export const useGetAllLicenses = params => {
  return useQuery({
    queryKey: ["licenses", params],
    queryFn: async () => {
      const response = await axiosInstance.get(
        LICENSE_ROUTES.GET_ALL_LICENSES,
        { params }
      );
      return response.data;
    },
  });
};

export const useGetLicenseById = id => {
  return useQuery({
    queryKey: ["license", id],
    queryFn: async () => {
      const response = await axiosInstance.get(
        LICENSE_ROUTES.GET_LICENSE_BY_ID(id)
      );
      return response.data;
    },
    enabled: !!id,
  });
};

export const useCreateLicense = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ licenseData, userId }) => {
      await axiosInstance.post(LICENSE_ROUTES.CREATE_LICENSE, licenseData, {
        params: { userId },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["licenses"]);
    },
  });
};

export const useUpdateLicense = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, licenseData, userId }) => {
      await axiosInstance.put(LICENSE_ROUTES.UPDATE_LICENSE(id), licenseData, {
        params: { userId },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["licenses"]);
    },
  });
};

export const useDeleteLicense = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, userId }) => {
      await axiosInstance.delete(LICENSE_ROUTES.DELETE_LICENSE(id), {
        params: { userId },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["licenses"]);
    },
  });
};

export const useExtendLicense = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, newEndDate, userId }) => {
      await axiosInstance.put(LICENSE_ROUTES.EXTEND_LICENSE(id), null, {
        params: { newEndDate, userId },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["licenses"]);
    },
  });
};

export const useGetPreviousLicenses = id => {
  return useQuery({
    queryKey: ["previous-licenses", id],
    queryFn: async () => {
      const response = await axiosInstance.get(
        LICENSE_ROUTES.GET_PREVIOUS_LICENSES(id)
      );
      return response.data;
    },
    enabled: !!id,
  });
};

export const useGetAllAudits = () => {
  return useQuery({
    queryKey: ["license-audits"],
    queryFn: async () => {
      const response = await axiosInstance.get(LICENSE_ROUTES.GET_ALL_AUDITS);
      return response.data;
    },
  });
};
