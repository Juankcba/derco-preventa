import type { AppProps } from "next/app";
import "../styles/globals.scss";
import { NextUIProvider } from "@nextui-org/react";
import { ligthTheme } from "../themes";
function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    // 2. Use at the root of your app
    <NextUIProvider theme={ligthTheme}>
      <Component {...pageProps} />
    </NextUIProvider>
  );
}

export default MyApp;
