import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import "../styles/globals.scss";
import { NextUIProvider } from "@nextui-org/react";
import { ligthTheme } from "../themes";
import { AuthProvider } from "../context";
import { UiProvider } from "../context/ui";
function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <AuthProvider>
        <UiProvider>
          <NextUIProvider theme={ligthTheme}>
            <Component {...pageProps} />
          </NextUIProvider>
        </UiProvider>
      </AuthProvider>
    </SessionProvider>
  );
}

export default MyApp;
