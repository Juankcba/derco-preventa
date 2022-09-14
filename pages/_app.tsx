import type { AppProps } from "next/app";

import "../styles/globals.scss";
import { NextUIProvider } from "@nextui-org/react";
import { ligthTheme } from "../themes";

import { UiProvider } from "../context/ui";
import { FilterProvider } from "../context/filters";
function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <FilterProvider>
      <UiProvider>
        <NextUIProvider theme={ligthTheme}>
          <Component {...pageProps} />
        </NextUIProvider>
      </UiProvider>
    </FilterProvider>
  );
}

export default MyApp;
