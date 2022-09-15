import { FC, PropsWithChildren, useContext } from "react";
import Head from "next/head";

import {
  Text,
  useTheme,
  Navbar,
  Button,
  Container,
  Grid,
  Link,
  Row,
  Spacer,
} from "@nextui-org/react";

import NavBarCustom from "../ui/NavBar";
import { Box } from "../ui/Box";

import Footer from "../ui/Footer";
import NavBar from "../ui/NavBar";
import FilterNavBar from "./../ui/FilterNavBar";

interface Props {
  title?: string;
  pageDescription?: string;
  image?: string;
  titleNavbar?: string;
}

const origin = typeof window === "undefined" ? "" : window.location.origin;

export const Layout: FC<PropsWithChildren<Props>> = ({
  children,
  title,
  titleNavbar,
  pageDescription,
  image,
}) => {
  const { theme } = useTheme();

  return (
    <Box
      css={{
        maxW: "100%",
      }}
    >
      <Head>
        <title>{title || "DercoCenter"}</title>
        <meta name="author" content="Soho" />
        <meta name="description" content={pageDescription || ` | ${title}`} />
        <meta name="keywords" content={`${title}, autos, dercocenter`} />

        <meta property="og:title" content={`${title}`} />
        <meta
          property="og:description"
          content={pageDescription || `${title}`}
        />
        <meta property="og:image" content={image || `${origin}/logo.png`} />
      </Head>

      <NavBarCustom titlePage={titleNavbar} />

      <main
        style={{
          backgroundColor: "#262626",
          padding: 0,
          minHeight: "100vh",
        }}
      >
        {children}
      </main>
      <Footer />

      <FilterNavBar />
    </Box>
  );
};
