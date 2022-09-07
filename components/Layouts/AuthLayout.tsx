import { FC, PropsWithChildren } from "react";
import Head from "next/head";
import { Container } from "@nextui-org/react";
interface Props {
  title: string;
}
const origin = typeof window === "undefined" ? "" : window.location.origin;

export const AuthLayout: FC<PropsWithChildren<Props>> = ({
  children,
  title,
}) => {
  return (
    <>
      <Head>
        <title>{title || "DercoCenter"}</title>
        <meta name="author" content="Soho" />
      </Head>

      <main>
        <Container
          display="flex"
          justify="center"
          alignItems="center"
          css={{ height: "calc(100vh - 200px)" }}
        >
          {children}
        </Container>
      </main>
    </>
  );
};
