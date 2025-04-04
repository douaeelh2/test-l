"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import Container from "@mui/material/Container";
import { CustomButton } from "@components/tables/CustomButton";
import useTheme from "@mui/material/styles/useTheme";
import { useTranslations } from "next-intl";
import Image from "next/image";
import LoginIcon from "@mui/icons-material/Login";
import Link from "next/link";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { FormFields } from "@components/forms/FormFields";

const Login = () => {
  const t = useTranslations("common");
  const theme = useTheme();

  const [showPassword, setShowPassword] = useState(false);

  const validationRules = {
    email: {
      required: t("login.validation.emailRequired"),
      pattern: {
        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        message: t("login.validation.emailInvalid"),
      },
      maxLength: {
        value: 100,
        message: t("login.validation.emailTooLong"),
      },
    },
    password: {
      required: t("login.validation.passwordRequired"),
      minLength: {
        value: 8,
        message: t("login.validation.passwordTooShort"),
      },
      maxLength: {
        value: 50,
        message: t("login.validation.passwordTooLong"),
      },
      validate: value => {
        const containsUppercase = /[A-Z]/.test(value);
        const containsLowercase = /[a-z]/.test(value);
        const containsNumber = /[0-9]/.test(value);
        const containsSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(value);

        if (!containsUppercase) {
          return t("login.validation.passwordUppercase");
        }
        if (!containsLowercase) {
          return t("login.validation.passwordLowercase");
        }
        if (!containsNumber) {
          return t("login.validation.passwordNumber");
        }
        if (!containsSpecialChar) {
          return t("login.validation.passwordSpecialChar");
        }
        return true;
      },
    },
  };

  const { control, handleSubmit } = useForm({
    defaultValues: {
      email: "Test@novelis.io",
      password: "",
      rememberMe: false,
    },
  });

  const onSubmit = data => {
    console.log("Login attempt", data);
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Container
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
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
            {t("login.title")}
          </Typography>
        </Box>

        <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
          <Box sx={{ width: "100%", mb: 1.5 }}>
            <FormFields
              name="email"
              control={control}
              rules={validationRules.email}
              label={t("login.email_label")}
              type="text"
              placeholder={t("login.email")}
            />
          </Box>

          <Box sx={{ width: "100%", mb: 1.5 }}>
            <FormFields
              name="password"
              control={control}
              rules={validationRules.password}
              label={t("login.password_label")}
              type={showPassword ? "text" : "password"}
              placeholder={t("login.password")}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      edge="end"
                      sx={{
                        color: theme.palette.info.indigo,
                      }}
                    >
                      {showPassword ? (
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
          <Box
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: ["column", "row", "row"],
              justifyContent: "space-between",
              alignItems: "center",
              mb: 2,
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                width: ["100%", "auto"],
                justifyContent: ["flex-start", "center"],
              }}
            >
              <FormFields
                name="rememberMe"
                control={control}
                type="checkbox"
                checkboxLabel={t("login.remember_me")}
              />
            </Box>
            <Box
              sx={{
                width: ["100%", "auto"],
                display: "flex",
                justifyContent: ["flex-end", "center"],
              }}
            >
              <Link href="/password/forget" passHref>
                <Typography
                  sx={{
                    fontSize: ["0.9rem", "1rem", "1rem"],
                    mb: [1, 0, 0],
                    cursor: "pointer",
                    textDecoration: "none",
                    display: "inline-block",
                    "&:hover": {
                      opacity: 0.8,
                    },
                  }}
                  color={theme.palette.info.main}
                >
                  {t("login.forgot_password")}
                </Typography>
              </Link>
            </Box>
          </Box>
          <Box sx={{ width: "100%" }}>
            <CustomButton
              width={"100%"}
              buttonMsg={t("login.login_button")}
              type="submit"
              showIcon={true}
              icon={LoginIcon}
              fullWidth
            />
          </Box>
        </form>
      </Box>
    </Container>
  );
};

export default Login;
