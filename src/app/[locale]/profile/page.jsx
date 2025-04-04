"use client";

import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";

import EditIcon from "@mui/icons-material/Edit";
import { useTranslations } from "next-intl";

import { CustomButton } from "@components/tables/CustomButton";
import { CustomTextField } from "@components/forms/CustomTextField";
import PersonIcon from "@mui/icons-material/Person";
import TableButton from "@components/tables/TableButton";

const UserProfileForm = () => {
  const theme = useTheme();
  const t = useTranslations("UserProfile");

  const [formData, setFormData] = useState({
    group: "",
    civility: "",
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    communicationsLanguage: "",
    timeZone: "",
    language: "",
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const labelStyle = {
    mb: 1,
    color: theme.palette.info.indigo,
    fontWeight: 500,
    fontSize: ["0.8rem", "0.825rem", "0.875rem"],
    display: "block",
  };

  const legendStyle = {
    fontSize: "20px",
    fontWeight: 600,
    color: theme.palette.primary.main,
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    console.log("Form Data:", formData);
  };

  return (
    <Grid
      container
      spacing={3}
      sx={{ paddingX: ["25px", "30px", "50px"], paddingY: "30px" }}
    >
      <Grid item md={12} lg={4}>
        <Box
          sx={{
            border: `1px solid ${theme.palette.primary.light}`,
            borderRadius: "5px",
            padding: "16px",
            mt: 1.5,
            mb: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            position: "relative",
          }}
        >
          <Box
            sx={{
              position: "relative",
              width: 120,
              height: 120,
              bgcolor: theme.palette.info.light,
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mb: 2,
            }}
          >
            <PersonIcon
              sx={{
                fontSize: 80,
                color: "white",
              }}
            />
            <Box
              sx={{
                position: "absolute",
                bottom: 0,
                right: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <TableButton
                icon={<EditIcon fontSize="16px" />}
                color="white"
                bgColor={theme.palette.secondary.main}
                onClick={() => {}}
              />
            </Box>
          </Box>
        </Box>

        <Box
          component="fieldset"
          sx={{
            border: `1px solid ${theme.palette.primary.light}`,
            borderRadius: "5px",
            paddingTop: "20px",
            paddingBottom: "40px",
            paddingX: "40px",
            position: "relative",
          }}
        >
          <legend style={legendStyle}>{t("changePassword")}</legend>

          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography sx={labelStyle}>{t("currentPassword")}</Typography>
              <CustomTextField
                name="currentPassword"
                type="password"
                value={formData.currentPassword}
                onChange={handleChange}
                placeholder={t("enterCurrentPassword")}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography sx={labelStyle}>{t("newPassword")}</Typography>
              <CustomTextField
                name="newPassword"
                type="password"
                value={formData.newPassword}
                onChange={handleChange}
                placeholder={t("enterNewPassword")}
              />
            </Grid>
            <Grid item xs={12} sx={{ mb: 1 }}>
              <Typography sx={labelStyle}>{t("confirmNewPassword")}</Typography>
              <CustomTextField
                name="confirmNewPassword"
                type="password"
                value={formData.confirmNewPassword}
                onChange={handleChange}
                placeholder={t("confirmNewPassword")}
              />
            </Grid>
            <Grid item xs={12}>
              <CustomButton
                buttonMsg={t("resetPassword")}
                onClick={handleSubmit}
                variant="primary"
                width="100%"
                fullWidth
              />
            </Grid>
          </Grid>
        </Box>
      </Grid>

      <Grid item md={12} lg={8}>
        <Box
          component="fieldset"
          sx={{
            border: `1px solid ${theme.palette.primary.light}`,
            borderRadius: "5px",
            paddingTop: "20px",
            paddingBottom: "40px",
            paddingX: "40px",
            mb: 4,
            position: "relative",
          }}
        >
          <legend style={legendStyle}>{t("userInformation")}</legend>

          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Typography sx={labelStyle}>{t("group")}</Typography>
              <CustomTextField
                name="group"
                value={formData.group}
                onChange={handleChange}
                placeholder={t("selectGroup")}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography sx={labelStyle}>{t("civility")}</Typography>
              <CustomTextField
                name="civility"
                value={formData.civility}
                onChange={handleChange}
                placeholder={t("selectCivility")}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography sx={labelStyle}>{t("firstName")}</Typography>
              <CustomTextField
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder={t("enterFirstName")}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography sx={labelStyle}>{t("lastName")}</Typography>
              <CustomTextField
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder={t("enterLastName")}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography sx={labelStyle}>{t("email")}</Typography>
              <CustomTextField
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder={t("enterEmail")}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography sx={labelStyle}>{t("phoneNumber")}</Typography>
              <CustomTextField
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                placeholder={t("enterPhoneNumber")}
              />
            </Grid>
          </Grid>
        </Box>

        <Box
          component="fieldset"
          sx={{
            border: `1px solid ${theme.palette.primary.light}`,
            borderRadius: "5px",
            paddingTop: "20px",
            paddingBottom: "40px",
            paddingX: "40px",
            position: "relative",
          }}
        >
          <legend style={legendStyle}>{t("preferences")}</legend>

          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography sx={labelStyle}>
                {t("communicationsLanguage")}
              </Typography>
              <CustomTextField
                name="communicationsLanguage"
                value={formData.communicationsLanguage}
                onChange={handleChange}
                placeholder={t("selectCommunicationLanguage")}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography sx={labelStyle}>{t("timeZone")}</Typography>
              <CustomTextField
                name="timeZone"
                value={formData.timeZone}
                onChange={handleChange}
                placeholder={t("enterTimeZone")}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography sx={labelStyle}>{t("language")}</Typography>
              <CustomTextField
                name="language"
                value={formData.language}
                onChange={handleChange}
                placeholder={t("enterLanguage")}
              />
            </Grid>
          </Grid>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            mt: 3,
            gap: 2,
            paddingX: { xs: "2px", sm: 0 },
          }}
        >
          <CustomButton
            buttonMsg={t("cancel")}
            onClick={() => {}}
            variant="outlined"
          />
          <CustomButton
            buttonMsg={t("update")}
            onClick={handleSubmit}
            variant="primary"
          />
        </Box>
      </Grid>
    </Grid>
  );
};

export default UserProfileForm;
