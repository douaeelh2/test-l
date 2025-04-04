import { useTranslations } from "next-intl";
import useTheme from "@mui/material/styles/useTheme";
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Card from "@mui/material/Card";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CardContent from "@mui/material/CardContent";
import React from "react";
import PropTypes from "prop-types";

export const HistoryDrawer = ({ open, onClose, license }) => {
  const t = useTranslations();
  const theme = useTheme();

  if (!license) return null;

  const handleOpenUserMenu = () => {
    console.log("Open user menu");
  };

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: 366,
          paddingX: 4,
          paddingY: 2,
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography
          variant="h6"
          component="h2"
          sx={{ color: theme.palette.primary.main, fontWeight: "bold" }}
        >
          {t("licenses.history.title")}
        </Typography>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </Box>

      {license.history.map((item, index) => (
        <Card
          key={item.id}
          sx={{
            boxShadow: "none",
            paddingY: 3,
            borderBottom:
              index === license.history.length - 1
                ? "none"
                : `1px solid ${theme.palette.primary.light}`,
          }}
        >
          <Box>
            <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <IconButton
                  onClick={handleOpenUserMenu}
                  sx={{ p: 0, color: theme.palette.primary.main, mr: 1 }}
                >
                  <AccountCircleIcon sx={{ width: 24, height: 24 }} />
                </IconButton>
              </Box>
              <Typography
                variant="body2"
                sx={{
                  fontSize: "16px",
                  fontWeight: "bold",
                  color: theme.palette.primary.main,
                }}
              >
                {item.user}
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography
                sx={{
                  fontSize: "16px",
                  fontWeight: "bold",
                  color: theme.palette.info.main,
                  mb: 1,
                }}
              >
                {item.action === "extension"
                  ? t("licenses.history.action.extension")
                  : t("licenses.history.action.generation")}
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: theme.palette.primary.main, fontWeight: "bold" }}
              >
                {item.date}
              </Typography>
            </Box>
          </Box>
          <CardContent
            sx={{
              bgcolor: theme.palette.info.secondary,
              borderRadius: "14px",
              color: theme.palette.primary.main,
              py: 2,
            }}
          >
            <Box>
              <Typography variant="body2" sx={{ mb: 1 }}>
                {t("licenses.history.details.licenseName")}:{" "}
                <strong>{item.details.nom}</strong>
              </Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>
                {t("licenses.history.details.licenseType")}:{" "}
                <strong>{item.details.type}</strong>
              </Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>
                {t("licenses.history.details.keyParams")}:
              </Typography>
              <ul style={{ margin: 0, paddingLeft: 20 }}>
                <li>
                  <Typography
                    variant="body2"
                    sx={{ mb: 1, fontWeight: "bold" }}
                  >
                    {t("licenses.params.users")}:{" "}
                    {item.details.parametres.utilisateur},
                  </Typography>
                </li>
                <li>
                  <Typography
                    variant="body2"
                    sx={{ mb: 1, fontWeight: "bold" }}
                  >
                    {t("licenses.params.duration")}:{" "}
                    {item.details.parametres.duree}{" "}
                    {t("licenses.params.months")},
                  </Typography>
                </li>
              </ul>
              <Typography variant="body2">
                {t("licenses.history.details.creationDate")}:{" "}
                <strong>{item.details.creationDate}</strong>
              </Typography>
            </Box>
          </CardContent>
        </Card>
      ))}
    </Drawer>
  );
};

HistoryDrawer.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  license: PropTypes.shape({
    history: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        user: PropTypes.string.isRequired,
        action: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
        details: PropTypes.shape({
          nom: PropTypes.string.isRequired,
          type: PropTypes.string.isRequired,
          parametres: PropTypes.shape({
            utilisateur: PropTypes.string.isRequired,
            duree: PropTypes.string.isRequired,
          }).isRequired,
          creationDate: PropTypes.string.isRequired,
        }).isRequired,
      })
    ).isRequired,
  }).isRequired,
};
