"use client";

import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import useTheme from "@mui/material/styles/useTheme";
import { useTranslations } from "next-intl";
import { LicenseTypeRow } from "@/components/tables/LicenseTypeRow";
import { CustomTable } from "@components/tables/CustomTable";

import { LicenseTypeForm } from "@/components/forms/LicenseTypeForm";
import { ConfirmDialog } from "@/components/tables/ConfirmDialog";

import { useLicenseTypes } from "@/hooks/useLicenseTypes";
import { FormType } from "@/enums/FormType";

const getMockLicenseTypes = (numTypes = 30) => {
  const names = ["Standard", "Business", "Entreprise", "Premium", "Pro"];

  return Array.from({ length: numTypes }, (_, i) => ({
    id: i + 1,
    name: names[i % names.length],
    parameters: [
      {
        name: "maxUsers",
        type: "number",
        description: "Maximum number of users",
      },
      { name: "duration", type: "string", description: "License duration" },
    ],
    paramCount: Math.floor(Math.random() * 10) + 1,
    createdAt: new Date(
      2023,
      Math.floor(Math.random() * 12),
      Math.floor(Math.random() * 28) + 1
    ).toLocaleDateString(),
  }));
};

export default function LicenseTypesPage() {
  const t = useTranslations("licenseTypes");
  const theme = useTheme();

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [licenseTypeToDelete, setLicenseTypeToDelete] = useState(null);

  const {
    licenseTypes,
    page,
    rowsPerPage,
    searchQuery,
    handleSearchChange,
    isCreateFormOpen,
    isEditFormOpen,
    currentLicenseType,
    handleChangePage,
    handleChangeRowsPerPage,
    openCreateForm,
    closeCreateForm,
    openEditForm,
    closeEditForm,
    handleCreateSubmit,
    handleEditSubmit,
    handleDeleteLicenseType,
    totalCount,
  } = useLicenseTypes({ getMockLicenseTypes });

  const openDeleteDialog = licenseType => {
    setLicenseTypeToDelete(licenseType);
    setDeleteDialogOpen(true);
  };

  const closeDeleteDialog = () => {
    setDeleteDialogOpen(false);
    setLicenseTypeToDelete(null);
  };

  const confirmDelete = () => {
    if (licenseTypeToDelete) {
      handleDeleteLicenseType(licenseTypeToDelete.id);
    }
    closeDeleteDialog();
  };

  const columns = [
    { key: "name", label: t("tableHeaders.name"), align: "left" },
    { key: "paramCount", label: t("tableHeaders.paramCount"), align: "left" },
    {
      key: "creationDate",
      label: t("tableHeaders.creationDate"),
      align: "left",
    },
    { key: "actions", label: t("tableHeaders.actions"), align: "center" },
  ];

  const renderLicenseTypeRow = licenseType => (
    <LicenseTypeRow
      key={licenseType.id}
      licenseType={licenseType}
      onEdit={() => openEditForm(licenseType)}
      onDelete={() => openDeleteDialog(licenseType)}
    />
  );

  return (
    <Grid sx={{ paddingX: ["20px", "30px", "50px"], paddingY: "30px" }}>
      <Typography
        variant="h6"
        component="h1"
        sx={{ mb: 4 }}
        color={theme.palette.primary.main}
        fontWeight="bold"
      >
        {t("pageTitle")}
      </Typography>

      <CustomTable
        columns={columns}
        data={licenseTypes}
        renderRow={renderLicenseTypeRow}
        totalCount={totalCount}
        searchQuery={searchQuery}
        handleSearchChange={handleSearchChange}
        page={page}
        rowsPerPage={rowsPerPage}
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
        onCreateClick={openCreateForm}
        createButtonLabel={t("createButton")}
        pageTitle={t("pageTitle")}
        searchPlaceholder={t("searchPlaceholder")}
      />

      <LicenseTypeForm
        open={isCreateFormOpen}
        onClose={closeCreateForm}
        onSubmit={handleCreateSubmit}
        formType={FormType.CREATE}
      />

      <LicenseTypeForm
        open={isEditFormOpen}
        onClose={closeEditForm}
        onSubmit={handleEditSubmit}
        formType={FormType.EDIT}
        licenseTypeId={currentLicenseType?.id}
        initialData={currentLicenseType}
      />

      <ConfirmDialog
        open={deleteDialogOpen}
        onClose={closeDeleteDialog}
        onConfirm={confirmDelete}
        title={t("deleteDialog.title")}
        message={t("deleteDialog.message")}
        confirmText={t("deleteDialog.confirmButton")}
        cancelText={t("deleteDialog.cancelButton")}
        itemName={licenseTypeToDelete?.name}
        confirmColor={theme.palette.error.primary}
      />
    </Grid>
  );
}
