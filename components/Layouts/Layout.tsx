import { FC, PropsWithChildren } from "react";
import Head from "next/head";

import { Container, Text, useTheme } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import NavBar from "../ui/NavBar";
import { Box } from "../ui/Box";

interface Props {
  title?: string;
  pageDescription?: string;
}

const origin = typeof window === "undefined" ? "" : window.location.origin;

export const Layout: FC<PropsWithChildren<Props>> = ({
  children,
  title,
  pageDescription,
}) => {
  const { theme } = useTheme();
  return (
    <Box
      css={{
        maxW: "100%",
      }}
    >
      <Head>
        <title>{title || "PokemonApp"}</title>
        <meta name="author" content="Soho" />
        <meta name="description" content={pageDescription || ` | ${title}`} />
        <meta name="keywords" content={`${title}, pokemon, pokedex`} />

        <meta property="og:title" content={`${title}`} />
        <meta
          property="og:description"
          content={pageDescription || `Esta es la página sobre ${title}`}
        />
        <meta property="og:image" content={`${origin}/img/banner.png`} />
      </Head>

      <NavBar />

      <main
        style={{
          padding: "0px 20px",
          minHeight: "84vh",
        }}
      >
        {children}
      </main>

      <footer
        style={{
          marginTop: "30px",
          height: "100px",
          display: "flex",
          width: "100%",
        }}
      >
        <div className="footer-container">
          <Link href="https://dercocenter.cl" passHref>
            <a target="_blank">DercoCenter</a>
          </Link>
        </div>
      </footer>
    </Box>
  );
};
