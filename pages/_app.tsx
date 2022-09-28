import type { AppProps } from "next/app";

import "../styles/globals.scss";
import { NextUIProvider } from "@nextui-org/react";
import { ligthTheme, basicTheme } from "../themes";

import { UiProvider } from "../context/ui";
import { FilterProvider } from "../context/filters";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { useRouter, Router } from "next/router";
import { useEffect } from "react";
/* eslint-disable */
declare global {
  interface Window {
    dataLayer?: any;
  }
}
/* eslint-enable */
function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const router = useRouter();
  const pageView = (url: string, title: string) => {
    window &&
      window.dataLayer &&
      window.dataLayer.push({
        event: "virtualPageview",
        virtualPageURL: url,
        virtualPageTitle: title,
      });
  };
  useEffect(() => {
    pageView(router.pathname, document.title);
    const handleRouteChange = (url: any) => {
      pageView(url, document.title);
    };
    Router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      Router.events.off("routeChangeComplete", handleRouteChange);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
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
