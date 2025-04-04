import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { CustomButton } from "@components/tables/CustomButton";
import { useTranslations } from "next-intl";
import { FormType } from "@/enums/FormType";
import PropTypes from "prop-types";
import useTheme from "@mui/material/styles/useTheme";
import { FormFields } from "@components/forms/FormFields";
import { useLicenseForm } from "@/hooks/useLicenseForm";

const licenseTypes = [
  { value: "smartroby", label: "SmartRoby" },
  { value: "ocr_pro", label: "OCR pro" },
  { value: "licence_premium", label: "Licence Premium" },
  { value: "starter_pack", label: "Starter Pack" },
  { value: "entreprise_plus", label: "Entreprise Plus" },
];

const clientsList = [
  { value: "client1", label: "Client A" },
  { value: "client2", label: "Client B" },
  { value: "client3", label: "Client C" },
];

export const LicenseForm = ({
  open,
  onClose,
  onSubmit,
  formType = FormType.CREATE,
  licenseId,
  initialData,
}) => {
  const t = useTranslations("licenses.form");
  const theme = useTheme();

  const {
    control,
    handleSubmit,
    formConfig: { title, buttonText, readOnlyFields },
    validationRules,
    isExtendForm,
  } = useLicenseForm(formType, initialData, licenseId, t, onSubmit, onClose);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      PaperProps={{
        sx: {
          width: "100%",
          maxWidth: isExtendForm ? "450px" : "600px",
          borderRadius: "7px",
          paddingY: "10px",
          transition: "all 0.3s ease-in-out",
        },
      }}
    >
      <DialogTitle sx={{ padding: "10px 25px 0 25px" }}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography
            variant="h6"
            color={theme.palette.primary.main}
            fontWeight="bold"
          >
            {title}
          </Typography>
          <IconButton
            edge="end"
            onClick={onClose}
            aria-label="close"
            sx={{ color: theme.palette.info.lightblue3 }}
          >
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>

      <form onSubmit={handleSubmit}>
        <DialogContent>
          {isExtendForm ? (
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <FormFields
                  name="name"
                  control={control}
                  label={t("labels.name")}
                  placeholder={t("placeholders.name")}
                  disabled={true}
                />
              </Grid>

              <Grid item xs={12}>
                <FormFields
                  name="endDate"
                  control={control}
                  rules={validationRules.endDate}
                  label={t("labels.endDate")}
                  placeholder={t("placeholders.endDate")}
                  type="date"
                />
              </Grid>

              <Grid item xs={12}>
                <FormFields
                  name="comment"
                  control={control}
                  label={t("labels.comment")}
                  placeholder={t("placeholders.comment")}
                  multiline={true}
                  rows={3}
                />
              </Grid>
            </Grid>
          ) : (
            <>
              <Grid container rowSpacing={1} columnSpacing={2}>
                <Grid item xs={12} sm={6}>
                  <FormFields
                    name="name"
                    control={control}
                    rules={validationRules.name}
                    label={t("labels.name")}
                    placeholder={t("placeholders.name")}
                    disabled={readOnlyFields.includes("name")}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormFields
                    name="type"
                    control={control}
                    rules={validationRules.type}
                    label={t("labels.type")}
                    placeholder={t("placeholders.type")}
                    type="select"
                    options={licenseTypes}
                    disabled={readOnlyFields.includes("type")}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormFields
                    name="startDate"
                    control={control}
                    rules={validationRules.startDate}
                    label={t("labels.startDate")}
                    placeholder={t("placeholders.startDate")}
                    type="date"
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormFields
                    name="endDate"
                    control={control}
                    rules={validationRules.endDate}
                    label={t("labels.endDate")}
                    placeholder={t("placeholders.endDate")}
                    type="date"
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormFields
                    name="client"
                    control={control}
                    rules={validationRules.client}
                    label={t("labels.client")}
                    placeholder={t("placeholders.client")}
                    type="select"
                    options={clientsList}
                    disabled={readOnlyFields.includes("client")}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormFields
                    name="comment"
                    control={control}
                    label={t("labels.comment")}
                    placeholder={t("placeholders.comment")}
                    multiline={true}
                    rows={3}
                  />
                </Grid>
              </Grid>

              <Box
                component="fieldset"
                sx={{
                  border: `1px solid ${theme.palette.primary.light}`,
                  borderRadius: "8px",
                  padding: "16px",
                  mt: 2,
                  position: "relative",
                }}
              >
                <legend
                  style={{
                    fontSize: "0.875rem",
                    fontWeight: 600,
                    padding: "0 8px",
                    color: theme.palette.primary.main,
                  }}
                >
                  {t("labels.parameters")}
                </legend>

                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <FormFields
                      name="companyName"
                      control={control}
                      label={t("labels.companyName")}
                      placeholder={t("placeholders.companyName")}
                      disabled={readOnlyFields.includes("companyName")}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <FormFields
                      name="maxProcess"
                      control={control}
                      label={t("labels.maxProcess")}
                      placeholder={t("placeholders.maxProcess")}
                      type="number"
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <FormFields
                      name="maxResources"
                      control={control}
                      label={t("labels.maxResources")}
                      placeholder={t("placeholders.maxResources")}
                      type="number"
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <FormFields
                      name="maxConcurrentSessions"
                      control={control}
                      label={t("labels.maxConcurrentSessions")}
                      placeholder={t("placeholders.maxConcurrentSessions")}
                      type="number"
                    />
                  </Grid>
                </Grid>
              </Box>
            </>
          )}
        </DialogContent>

        <DialogActions sx={{ mb: 2, padding: "0 30px" }}>
          <CustomButton
            buttonMsg={t("cancel")}
            onClick={onClose}
            variant="text"
          />

          <CustomButton
            buttonMsg={buttonText}
            type="submit"
            variant="primary"
          />
        </DialogActions>
      </form>
    </Dialog>
  );
};

LicenseForm.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  formType: PropTypes.oneOf(Object.values(FormType)).isRequired,
  licenseId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  initialData: PropTypes.object,
};
