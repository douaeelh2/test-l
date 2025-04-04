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
import Image from "next/image";
import DeleteIcon from "@/assets/icons/deletekpi.svg";
import useTheme from "@mui/material/styles/useTheme";
import { CustomButton } from "@components/tables/CustomButton";
import { useTranslations } from "next-intl";
import PropTypes from "prop-types";
import { FormType } from "@/enums/FormType";
import { FormFields } from "@components/forms/FormFields";
import { useLicenseTypeForm } from "@/hooks/useLicenseTypeForm";

const parameterTypeOptions = [
  { value: "string", label: "Texte" },
  { value: "number", label: "Nombre" },
  { value: "boolean", label: "Booléen" },
  { value: "date", label: "Date" },
];

export const LicenseTypeForm = ({
  open,
  onClose,
  onSubmit,
  formType = FormType.CREATE,
  licenseTypeId,
  initialData,
}) => {
  const theme = useTheme();
  const t = useTranslations("licenseTypes.form");

  const {
    control,
    handleSubmit,
    fields,
    append,
    remove,
    parameterError,
    validationRules,
    formConfig: { title, buttonText, readOnlyFields },
  } = useLicenseTypeForm(
    open,
    formType,
    initialData,
    licenseTypeId,
    t,
    onSubmit,
    onClose
  );

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      PaperProps={{
        sx: {
          width: "100%",
          maxWidth: "775px",
          borderRadius: "7px",
          backgroundColor: "white",
          paddingY: "10px",
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
          <IconButton edge="end" onClick={onClose} aria-label="close">
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>

      <form onSubmit={handleSubmit}>
        <DialogContent
          sx={{
            padding: "24px 30px",
            backgroundColor: "white",
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <FormFields
                name="name"
                control={control}
                rules={validationRules.name}
                label={t("labels.name")}
                placeholder={t("placeholders.name")}
                disabled={readOnlyFields.includes("name")}
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

            {fields.map((field, index) => (
              <Box key={field.id} sx={{ mb: 2 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={3}>
                    <FormFields
                      name={`parameters.${index}.name`}
                      control={control}
                      rules={{
                        required:
                          fields.length === 1 || index === 0
                            ? t("validation.parameterNameRequired")
                            : false,
                      }}
                      label={`${t("labels.parameterName")} ${index + 1}*`}
                      placeholder={t("placeholders.parameterName")}
                    />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <FormFields
                      name={`parameters.${index}.type`}
                      control={control}
                      rules={{
                        required:
                          fields.length === 1 || index === 0
                            ? t("validation.parameterTypeRequired")
                            : false,
                      }}
                      label={`${t("labels.parameterType")}*`}
                      placeholder={t("placeholders.parameterType")}
                      type="select"
                      options={parameterTypeOptions}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography
                      sx={{
                        color: theme.palette.info.indigo,
                        fontWeight: 500,
                        fontSize: "0.875rem",
                        display: "block",
                      }}
                    >
                      {t("labels.description")}
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 1,
                      }}
                    >
                      <Box sx={{ flexGrow: 1 }}>
                        <FormFields
                          name={`parameters.${index}.description`}
                          control={control}
                          placeholder={t("placeholders.description")}
                          label=""
                        />
                      </Box>
                      {index > 0 && (
                        <IconButton
                          onClick={() => remove(index)}
                          sx={{
                            borderRadius: "50%",
                            width: "36px",
                            height: "36px",
                          }}
                        >
                          <Image
                            src={DeleteIcon}
                            alt="Delete KPI Icon"
                            width={20}
                            height={22}
                          />
                        </IconButton>
                      )}
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            ))}

            {parameterError && (
              <Typography
                color="error"
                variant="body2"
                sx={{
                  textAlign: "center",
                  mt: 2,
                  fontWeight: "bold",
                }}
              >
                {t("validation.atLeastOneParameterRequired")}
              </Typography>
            )}

            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              <CustomButton
                buttonMsg={t("addParameter")}
                onClick={() => append({ name: "", type: "", description: "" })}
                variant="outlined"
                showIcon={true}
              />
            </Box>
          </Box>
        </DialogContent>

        <DialogActions sx={{ mb: 2, padding: "0 30px" }}>
          <CustomButton
            buttonMsg={t("cancel")}
            onClick={onClose}
            variant="text"
          />
          <CustomButton
            variant="primary"
            buttonMsg={buttonText}
            type="submit"
          />
        </DialogActions>
      </form>
    </Dialog>
  );
};

LicenseTypeForm.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  formType: PropTypes.oneOf(Object.values(FormType)).isRequired,
  licenseTypeId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  initialData: PropTypes.object,
};
