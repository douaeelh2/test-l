import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { LICENSE_TYPE_ROUTES } from "@api/routes/licenseTypeRoute";

import axiosInstance from "../axios/instance/axiosInstance";

export const useGetAllLicenseTypes = params => {
  return useQuery({
    queryKey: ["license-types", params],
    queryFn: async () => {
      const response = await axiosInstance.get(LICENSE_TYPE_ROUTES.GET_ALL, {
        params,
      });
      return response.data;
    },
  });
};

export const useGetLicenseTypeNames = () => {
  return useQuery({
    queryKey: ["license-type-names"],
    queryFn: async () => {
      const response = await axiosInstance.get(LICENSE_TYPE_ROUTES.GET_NAMES);
      return response.data;
    },
  });
};

export const useCreateLicenseType = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async data => {
      await axiosInstance.post(LICENSE_TYPE_ROUTES.CREATE, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["license-types"]);
    },
  });
};

export const useUpdateLicenseType = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, data }) => {
      await axiosInstance.put(LICENSE_TYPE_ROUTES.UPDATE(id), data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["license-types"]);
    },
  });
};

export const useDeleteLicenseType = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async id => {
      await axiosInstance.delete(LICENSE_TYPE_ROUTES.DELETE(id));
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["license-types"]);
    },
  });
};
