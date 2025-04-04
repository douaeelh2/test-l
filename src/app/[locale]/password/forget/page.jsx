"use client";

import React from "react";
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

const ForgotPassword = () => {
  const t = useTranslations("common.forgotPassword");
  const theme = useTheme();

  const validationRules = {
    email: {
      required: t("validation.emailRequired"),
      pattern: {
        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        message: t("validation.emailInvalid"),
      },
      maxLength: {
        value: 100,
        message: t("validation.emailTooLong"),
      },
    },
  };

  // Use React Hook Form
  const { control, handleSubmit } = useForm({
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = data => {
    console.log("Password Reset attempt", data);
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
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            width: "100%",
            mb: 1,
          }}
        >
          <Typography
            sx={{
              mb: 1,
              fontSize: ["13px", "15px", "16px"],
            }}
            color={theme.palette.primary.main}
          >
            {t("description")}
          </Typography>
        </Box>

        <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
          <Box sx={{ width: "100%", mb: 4 }}>
            <FormFields
              name="email"
              control={control}
              rules={validationRules.email}
              label={t("email_label")}
              type="text"
              placeholder={t("email_placeholder")}
            />
          </Box>

          <Box sx={{ width: "100%", marginY: 1.5 }}>
            <CustomButton
              width={"100%"}
              buttonMsg={t("reset_button")}
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

export default ForgotPassword;
