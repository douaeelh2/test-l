"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import { useTheme } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import React, { useState } from "react";

import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LanguageIcon from "@mui/icons-material/Language";

import CustomMenu from "@components/layout/CustomMenu";
import { getLanguages, getSettings } from "@utils/constants";
import Grid from "@mui/material/Grid";

const APP_ROUTES = {
  HOME: "/",
  LICENSES: "/licenses",
  LICENSE_TYPES: "/licensetypes",
  PROFILE: "/profile",
};

function Navbar() {
  const t = useTranslations("navbar");
  const theme = useTheme();
  const pathname = usePathname();
  const router = useRouter();

  const languages = getLanguages(t);
  const settings = getSettings(t);

  const getActivePath = () => {
    return pathname.includes("licensetypes")
      ? APP_ROUTES.LICENSE_TYPES
      : APP_ROUTES.LICENSES;
  };

  const activePath = getActivePath();

  const getAlternativeRoute = () => {
    return activePath === APP_ROUTES.LICENSES
      ? { name: t("routes.licensetypes"), path: APP_ROUTES.LICENSE_TYPES }
      : { name: t("routes.licenses"), path: APP_ROUTES.LICENSES };
  };

  const alternativeRoute = getAlternativeRoute();

  const [anchorElUser, setAnchorElUser] = useState(null);
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElLang, setAnchorElLang] = useState(null);

  const handleOpenUserMenu = event => setAnchorElUser(event.currentTarget);
  const handleCloseUserMenu = () => setAnchorElUser(null);
  const handleOpenNavMenu = event => setAnchorElNav(event.currentTarget);
  const handleCloseNavMenu = () => setAnchorElNav(null);
  const handleOpenLangMenu = event => setAnchorElLang(event.currentTarget);
  const handleCloseLangMenu = () => setAnchorElLang(null);

  const handleLanguageChange = lang => {
    const segments = pathname.split("/").filter(Boolean);
    if (segments.length > 0 && ["fr", "en"].includes(segments[0])) {
      segments.shift();
    }

    const newPath = `/${lang}/${segments.join("/")}`;
    console.log("Language change to:", newPath);

    router.push(newPath);
    handleCloseLangMenu();
  };

  const handleProfileNavigation = () => {
    const currentLang = pathname.split("/")[1] || "en";
    console.log("Navigating to profile");
    router.push(`/${currentLang}${APP_ROUTES.PROFILE}`);
    handleCloseUserMenu();
  };

  const handleLogout = () => {
    const currentLang = pathname.split("/")[1] || "en";
    console.log("Logging out");
    router.push(`/${currentLang}`);
    handleCloseUserMenu();
  };

  return (
    <AppBar
      position="static"
      sx={{
        bgcolor: "white",
        color: theme.palette.primary.main,
        paddingX: ["20px", "30px", "50px"],
        mb: 2,
      }}
    >
      <Grid sx={{ borderBottom: `1px solid ${theme.palette.primary.light}` }}>
        <Toolbar
          disableGutters
          sx={{
            display: { xs: "flex", md: "none" },
            justifyContent: "space-between",
            alignItems: "center",
            height: "64px",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton
              size="large"
              aria-label="routes menu"
              aria-controls="menu-routes"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <CustomMenu
              id="menu-routes"
              anchorEl={anchorElNav}
              onClose={handleCloseNavMenu}
              items={
                alternativeRoute
                  ? [
                      {
                        key: alternativeRoute.path,
                        label: alternativeRoute.name,
                        component: (
                          <MenuItem
                            onClick={() => router.push(alternativeRoute.path)}
                          >
                            {alternativeRoute.name}
                          </MenuItem>
                        ),
                      },
                    ]
                  : []
              }
            />
          </Box>

          <Box sx={{ display: "flex", justifyContent: "center", flexGrow: 1 }}>
            <Link href={APP_ROUTES.LICENSES}>
              <Image
                src="/license-logo.png"
                width={166}
                height={16}
                alt="Logo"
                style={{ cursor: "pointer" }}
              />
            </Link>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Box sx={{ mr: 1 }}>
              <Tooltip title={t("language")}>
                <IconButton
                  onClick={handleOpenLangMenu}
                  sx={{
                    p: 0,
                    color: theme.palette.primary.main,
                  }}
                >
                  <LanguageIcon sx={{ fontSize: 24 }} />
                </IconButton>
              </Tooltip>
              <CustomMenu
                id="menu-language"
                anchorEl={anchorElLang}
                onClose={handleCloseLangMenu}
                items={languages.map(lang => ({
                  ...lang,
                  key: lang.key,
                  label: lang.label,
                }))}
                onItemClick={item => handleLanguageChange(item.key)}
              />
            </Box>

            <Box>
              <Tooltip title={t("setting")}>
                <IconButton
                  onClick={handleOpenUserMenu}
                  sx={{
                    p: 0,
                    color: theme.palette.primary.main,
                  }}
                >
                  <AccountCircleIcon sx={{ fontSize: 28 }} />
                </IconButton>
              </Tooltip>
              <CustomMenu
                id="menu-appbar"
                anchorEl={anchorElUser}
                onClose={handleCloseUserMenu}
                items={[
                  {
                    key: "profile",
                    label: t("settings.profile"),
                    component: (
                      <MenuItem onClick={handleProfileNavigation}>
                        {t("settings.profile")}
                      </MenuItem>
                    ),
                  },
                  {
                    key: "logout",
                    label: t("settings.logout"),
                    component: (
                      <MenuItem onClick={handleLogout}>
                        {t("settings.logout")}
                      </MenuItem>
                    ),
                  },
                ]}
              />
            </Box>
          </Box>
        </Toolbar>

        <Toolbar
          disableGutters
          sx={{
            display: { xs: "none", md: "flex" },
            justifyContent: "space-between",
            alignItems: "center",
            height: "64px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              flexGrow: { xs: 1, md: 0 },
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <Link href={APP_ROUTES.LICENSES}>
                <Image
                  src="/license-logo.png"
                  width={166}
                  height={16}
                  alt="Logo"
                  style={{
                    cursor: "pointer",
                    marginRight: "50px",
                  }}
                />
              </Link>
            </Box>
          </Box>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              flexGrow: 1,
              paddingLeft: 5,
              borderLeft: `1px solid ${theme.palette.primary.light}`,
            }}
          >
            <Typography
              sx={{
                textTransform: "none",
                color: theme.palette.primary.main,
                fontWeight: "bold",
                fontSize: "14px",
                marginRight: 4,
              }}
            >
              {t("title")}
            </Typography>

            {alternativeRoute && (
              <Button
                onClick={() => router.push(alternativeRoute.path)}
                sx={{
                  textTransform: "none",
                  bgcolor: theme.palette.info.secondary,
                  color: theme.palette.info.main,
                  padding: "8px 16px",
                  fontSize: "14px",
                  fontWeight: "bold",
                  borderRadius: "5px",
                }}
              >
                {alternativeRoute.name}
              </Button>
            )}
          </Box>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Box sx={{ mr: 2 }}>
              <Tooltip title={t("language")}>
                <IconButton
                  onClick={handleOpenLangMenu}
                  sx={{
                    p: 0,
                    color: theme.palette.primary.main,
                  }}
                >
                  <LanguageIcon sx={{ fontSize: 26 }} />
                </IconButton>
              </Tooltip>
              <CustomMenu
                id="menu-language"
                anchorEl={anchorElLang}
                onClose={handleCloseLangMenu}
                items={languages.map(lang => ({
                  ...lang,
                  key: lang.key,
                  label: lang.label,
                }))}
                onItemClick={item => handleLanguageChange(item.key)}
              />
            </Box>

            <Box>
              <Tooltip title={t("setting")}>
                <IconButton
                  onClick={handleOpenUserMenu}
                  sx={{
                    p: 0,
                    color: theme.palette.primary.main,
                  }}
                >
                  <AccountCircleIcon sx={{ fontSize: 32 }} />
                </IconButton>
              </Tooltip>
              <CustomMenu
                id="menu-appbar"
                anchorEl={anchorElUser}
                onClose={handleCloseUserMenu}
                items={[
                  {
                    key: "profile",
                    label: t("settings.profile"),
                    action: handleProfileNavigation,
                  },
                  {
                    key: "logout",
                    label: t("settings.logout"),
                    action: handleLogout,
                  },
                ]}
                onItemClick={item => item.action()}
              />
            </Box>
          </Box>
        </Toolbar>
      </Grid>
    </AppBar>
  );
}

export default Navbar;
