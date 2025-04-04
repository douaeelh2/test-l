"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { FormFields } from "@components/forms/FormFields";
import { CustomButton } from "@components/tables/CustomButton";
import Link from "next/link";
import useTheme from "@mui/material/styles/useTheme";
import { useTranslations } from "next-intl";
import Image from "next/image";
import LockResetIcon from "@mui/icons-material/LockReset";
import LoginIcon from "@mui/icons-material/Login";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const ChangePassword = () => {
  const t = useTranslations("common.changePassword");
  const theme = useTheme();

  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const validationRules = {
    oldPassword: {
      required: t("validation.oldPasswordRequired"),
      minLength: {
        value: 8,
        message: t("validation.passwordTooShort"),
      },
      maxLength: {
        value: 50,
        message: t("validation.passwordTooLong"),
      },
    },
    newPassword: {
      required: t("validation.newPasswordRequired"),
      minLength: {
        value: 8,
        message: t("validation.passwordTooShort"),
      },
      maxLength: {
        value: 50,
        message: t("validation.passwordTooLong"),
      },
      validate: {
        notSameAsOld: value =>
          value !== this.oldPassword || t("validation.newPasswordSameAsOld"),
        containsUppercase: value =>
          /[A-Z]/.test(value) || t("validation.passwordUppercase"),
        containsLowercase: value =>
          /[a-z]/.test(value) || t("validation.passwordLowercase"),
        containsNumber: value =>
          /[0-9]/.test(value) || t("validation.passwordNumber"),
        containsSpecialChar: value =>
          /[!@#$%^&*(),.?":{}|<>]/.test(value) ||
          t("validation.passwordSpecialChar"),
      },
    },
  };

  const { control, handleSubmit, watch } = useForm({
    defaultValues: {
      oldPassword: "",
      newPassword: "",
    },
  });

  const oldPassword = watch("oldPassword");

  const onSubmit = data => {
    console.log("Change Password", {
      oldPassword: data.oldPassword,
      newPassword: data.newPassword,
    });
  };

  const handleClickShowOldPassword = () => {
    setShowOldPassword(!showOldPassword);
  };

  const handleClickShowNewPassword = () => {
    setShowNewPassword(!showNewPassword);
  };

  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Box
        sx={{
          width: ["95%", "90%", "100%"],
          maxWidth: "500px",
          boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
          border: "1px solid rgba(0, 0, 0, 0.12)",
          borderRadius: "5px",
          padding: ["35px", "40px", "55px"],
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "white",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            mb: 3,
            width: "100%",
            justifyContent: "center",
          }}
        >
          <Image
            src="/license-logo-2.png"
            width={390}
            height={42}
            alt="Logo"
            style={{
              maxWidth: ["180px", "300px", "390px"],
              height: "auto",
            }}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            width: "100%",
          }}
        >
          <Typography
            variant="h6"
            component="h1"
            sx={{
              mb: 1,
              fontSize: ["16px", "20px", "22px"],
              fontWeight: "bold",
            }}
            color={theme.palette.primary.main}
          >
            {t("title")}
          </Typography>
        </Box>

        <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
          <Box sx={{ width: "100%", mb: 2 }}>
            <FormFields
              name="oldPassword"
              control={control}
              rules={validationRules.oldPassword}
              label={t("old_password_label")}
              type={showOldPassword ? "text" : "password"}
              placeholder={t("old_password_placeholder")}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      sx={{
                        color: theme.palette.primary.dark,
                        "&:hover": {
                          color: theme.palette.primary.dark,
                        },
                      }}
                      aria-label="toggle old password visibility"
                      onClick={handleClickShowOldPassword}
                      edge="end"
                    >
                      {showOldPassword ? (
                        <VisibilityOffIcon />
                      ) : (
                        <VisibilityIcon />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Box>

          <Box sx={{ width: "100%", mb: 4 }}>
            <FormFields
              name="newPassword"
              control={control}
              rules={{
                ...validationRules.newPassword,
                validate: {
                  ...validationRules.newPassword.validate,
                  notSameAsOld: value =>
                    value !== oldPassword ||
                    t("validation.newPasswordSameAsOld"),
                },
              }}
              label={t("new_password_label")}
              type={showNewPassword ? "text" : "password"}
              placeholder={t("new_password_placeholder")}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle new password visibility"
                      onClick={handleClickShowNewPassword}
                      edge="end"
                      sx={{
                        color: theme.palette.info.indigo,
                      }}
                    >
                      {showNewPassword ? (
                        <VisibilityOffIcon />
                      ) : (
                        <VisibilityIcon />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Box>

          <Box sx={{ width: "100%", mb: 2 }}>
            <CustomButton
              width={"100%"}
              buttonMsg={t("change_password_button")}
              type="submit"
              showIcon={true}
              icon={LockResetIcon}
              fullWidth
            />
          </Box>

          <Box sx={{ width: "100%" }}>
            <Link href="/" passHref>
              <CustomButton
                width={"100%"}
                variant="outlined"
                buttonMsg={t("back_to_login")}
                showIcon={true}
                icon={LoginIcon}
                fullWidth
              />
            </Link>
          </Box>
        </form>
      </Box>
    </Container>
  );
};

export default ChangePassword;
