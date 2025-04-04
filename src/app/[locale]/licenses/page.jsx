"use client";

import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import useTheme from "@mui/material/styles/useTheme";

import { PreviousLicenseRow } from "@/components/tables/PreviousLicenseRow";
import { LicenseRow } from "@/components/tables/LicenseRow";

import { HistoryDrawer } from "@components/layout/HistoryDrawer";
import React from "react";

import { useLicenses } from "@/hooks/useLicenses";
import { useTranslations } from "next-intl";
import { LicenseForm } from "@/components/forms/LicenseForm";
import { ConfirmDialog } from "@/components/tables/ConfirmDialog";
import { FormType } from "@/enums/FormType";
import { CustomTable } from "@components/tables/CustomTable";

const getMockLicences = (numLicences = 30) => {
  const types = [
    "Standard",
    "Business",
    "Entreprise",
    "Entreprise Plus",
    "Premium",
    "SmartRoby",
    "OCR pro",
    "Licence Premium",
    "Starter Pack",
  ];

  return Array.from({ length: numLicences }, (_, i) => {
    const typeIndex = i % types.length;
    const randomType = types[typeIndex];
    const randomUsers = ((i * 7) % 100) + 1;
    const durationOptions = [6, 12, 24, 36, 48];
    const randomDuration = durationOptions[i % durationOptions.length];

    return {
      id: i + 1,
      name: `Licence ${String.fromCharCode(65 + (i % 26))} ${i + 1}`,
      type: randomType,
      params: `Utilisateurs : ${randomUsers}, Durée : ${randomDuration} mois`,
      creationDate: new Date(
        2023,
        i % 12,
        ((i * 3) % 28) + 1
      ).toLocaleDateString(),
      previousLicense: {
        name: `Licence ${String.fromCharCode(65 + (i % 26))} ${i + 1}`,
        type: randomType,
        params: `Utilisateurs : ${randomUsers - 5}, Durée : ${randomDuration - 6} mois`,
        creationDate: new Date(
          2022,
          i % 12,
          ((i * 3) % 28) + 1
        ).toLocaleDateString(),
      },
      history: [
        {
          id: 1,
          user: "James Carter",
          action: "Extension",
          date: "27/07/2024 22:43:33",
          details: {
            nom: `Licence ${String.fromCharCode(65 + (i % 26))}`,
            type: randomType,
            parametres: {
              utilisateur: 10,
              duree: "24 mois",
            },
            creationDate: "27/07/2024 22:43:33",
          },
        },
        {
          id: 2,
          user: "James Carter",
          action: "Génération",
          date: "27/07/2023 17:43:33",
          details: {
            nom: `Licence ${String.fromCharCode(65 + (i % 26))}`,
            type: randomType,
            parametres: {
              utilisateur: 10,
              duree: "12 mois",
            },
            creationDate: "27/07/2023 17:43:33",
          },
        },
      ],
    };
  });
};

export default function LicensePage() {
  const t = useTranslations("licenses");
  const theme = useTheme();

  const {
    licenses,
    searchQuery,
    handleSearchChange,
    expandedRows,
    toggleRowExpansion,
    historyOpen,
    handleOpenHistory,
    handleCloseHistory,
    currentLicenseHistory,
    formOpen,
    handleOpenForm,
    handleCloseForm,
    handleFormSubmit,
    editFormOpen,
    handleOpenEditForm,
    handleCloseEditForm,
    handleEditSubmit,
    extendFormOpen,
    handleOpenExtendForm,
    handleCloseExtendForm,
    handleExtendSubmit,
    deleteFormOpen,
    handleOpenDeleteForm,
    handleCloseDeleteForm,
    handleDeleteSubmit,
    currentLicenseId,
    getCurrentLicense,
    page,
    rowsPerPage,
    handleChangePage,
    handleChangeRowsPerPage,
    totalCount,
  } = useLicenses({ getMockLicences });

  const currentLicense = getCurrentLicense();

  const columns = [
    { key: "", label: "", align: "left" },
    { key: "licenseName", label: t("tableHeaders.licenseName"), align: "left" },
    { key: "licenseType", label: t("tableHeaders.licenseType"), align: "left" },
    { key: "keyParams", label: t("tableHeaders.keyParams"), align: "left" },
    {
      key: "creationDate",
      label: t("tableHeaders.creationDate"),
      align: "left",
    },
    { key: "actions", label: t("tableHeaders.actions"), align: "center" },
  ];

  const renderLicenseRow = licence => (
    <React.Fragment key={licence.id}>
      <LicenseRow
        licence={licence}
        isExpanded={expandedRows[licence.id]}
        onToggleExpand={() => toggleRowExpansion(licence.id)}
        onExtend={() => handleOpenExtendForm(licence.id)}
        onEdit={() => handleOpenEditForm(licence.id)}
        onDelete={() => handleOpenDeleteForm(licence.id)}
        onHistory={() => handleOpenHistory(licence)}
      />
      {expandedRows[licence.id] && licence.previousLicense && (
        <PreviousLicenseRow
          previousLicense={licence.previousLicense}
          onToggleExpand={() => toggleRowExpansion(licence.id)}
        />
      )}
    </React.Fragment>
  );

  return (
    <Grid
      sx={{
        paddingX: ["20px", "30px", "50px"],
        paddingY: ["15px", "20px", "30px"],
      }}
    >
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
        data={licenses}
        renderRow={renderLicenseRow}
        totalCount={totalCount}
        searchQuery={searchQuery}
        handleSearchChange={handleSearchChange}
        page={page}
        rowsPerPage={rowsPerPage}
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
        onCreateClick={handleOpenForm}
        createButtonLabel={t("createButton")}
        pageTitle={t("pageTitle")}
        searchPlaceholder={t("searchPlaceholder")}
      />

      <HistoryDrawer
        open={historyOpen}
        onClose={handleCloseHistory}
        license={currentLicenseHistory}
      />

      <LicenseForm
        open={formOpen}
        onClose={handleCloseForm}
        onSubmit={handleFormSubmit}
        formType={FormType.CREATE}
      />

      <LicenseForm
        open={editFormOpen}
        onClose={handleCloseEditForm}
        onSubmit={handleEditSubmit}
        formType={FormType.EDIT}
        licenseId={currentLicenseId}
        initialData={currentLicense}
      />

      <LicenseForm
        open={extendFormOpen}
        onClose={handleCloseExtendForm}
        onSubmit={handleExtendSubmit}
        formType={FormType.EXTEND}
        licenseId={currentLicenseId}
        initialData={currentLicense}
      />

      <ConfirmDialog
        open={deleteFormOpen}
        onClose={handleCloseDeleteForm}
        onConfirm={handleDeleteSubmit}
        title={t("deleteDialog.title")}
        message={t("deleteDialog.message")}
        confirmText={t("deleteDialog.confirmButton")}
        cancelText={t("deleteDialog.cancelButton")}
        itemName={currentLicense?.name || ""}
        confirmColor={theme.palette.error.primary}
      />
    </Grid>
  );
}
