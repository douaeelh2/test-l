import { hasLocale } from "next-intl";
import { NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { Providers } from "@/providers";

import Navbar from "@components/layout/Navbar";
import NextTopLoader from "nextjs-toploader";
import Container from "@mui/material/Container";

export default async function RootLayout({ children, params }) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <html lang={locale}>
      <body>
        <Container maxWidth="90%">
          <NextTopLoader
            color="#7BB0FF"
            sx={{ opacity: 0.4 }}
            showSpinner={false}
          />
          <NextIntlClientProvider locale={locale}>
            <Providers>
              <Navbar />
              {children}
            </Providers>
          </NextIntlClientProvider>
        </Container>
      </body>
    </html>
  );
}
