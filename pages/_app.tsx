import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import "../styles/globals.scss";
import { NextUIProvider } from "@nextui-org/react";
import { ligthTheme } from "../themes";
import { AuthProvider } from "../context";
import { UiProvider } from "../context/ui";
import { FilterProvider } from "../context/filters";
function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <AuthProvider>
        <FilterProvider>
          <UiProvider>
            <NextUIProvider theme={ligthTheme}>
              <Component {...pageProps} />
            </NextUIProvider>
          </UiProvider>
        </FilterProvider>
      </AuthProvider>
    </SessionProvider>
  );
}

export default MyApp;
