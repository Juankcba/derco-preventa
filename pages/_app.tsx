import type { AppProps } from "next/app";

import "../styles/globals.scss";
import { NextUIProvider } from "@nextui-org/react";
import { ligthTheme, basicTheme } from "../themes";

import { UiProvider } from "../context/ui";
import { FilterProvider } from "../context/filters";
import { CssBaseline, ThemeProvider } from "@mui/material";
function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <FilterProvider>
      <UiProvider>
        <NextUIProvider theme={ligthTheme}>
          <ThemeProvider theme={basicTheme}>
            <CssBaseline />
            <Component {...pageProps} />
          </ThemeProvider>
        </NextUIProvider>
      </UiProvider>
    </FilterProvider>
  );
}

export default MyApp;
