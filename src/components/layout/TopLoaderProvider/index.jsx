"use client";

import NextTopLoader from "nextjs-toploader";
import useTheme from "@mui/material/styles/useTheme";

export default function TopLoaderProvider() {
  const theme = useTheme();
  return (
    <NextTopLoader color={theme.palette.primary.main} showSpinner={true} />
  );
}
