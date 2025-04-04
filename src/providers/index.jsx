"use client";

import { CssBaseline, ThemeProvider } from "@mui/material";
import { theme } from "@config/theme";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import queryClient from "@config/ReactQuery/QueryClient";

export function Providers({ children }) {
  return (
    <ThemeProvider theme={theme("light")}>
      <CssBaseline />
      <QueryClientProvider client={queryClient}>
        {children}
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </ThemeProvider>
  );
}
