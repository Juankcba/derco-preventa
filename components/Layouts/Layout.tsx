import { FC, PropsWithChildren, useContext } from "react";
import Head from "next/head";

import { Text, useTheme, Navbar, Button } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import NavBarCustom from "../ui/NavBar";
import { Box } from "../ui/Box";
import { UiContext } from "../../context";
import { FilterIcon } from "./../ui/FilterIcon";

interface Props {
  title?: string;
  pageDescription?: string;
  image?: string;
}

const origin = typeof window === "undefined" ? "" : window.location.origin;

export const Layout: FC<PropsWithChildren<Props>> = ({
  children,
  title,
  pageDescription,
  image,
}) => {
  const { theme } = useTheme();
  const { setVisible } = useContext(UiContext);

  const handler = () => {
    setVisible(true);
  };

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
        <meta name="keywords" content={`${title}, autos, dercocenter`} />

        <meta property="og:title" content={`${title}`} />
        <meta
          property="og:description"
          content={pageDescription || `${title}`}
        />
        <meta property="og:image" content={image || `${origin}/logo.png`} />
      </Head>

      <NavBarCustom />

      <main
        style={{
          backgroundColor: "#262626",
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
      <Navbar variant="sticky" css={{ bottom: 0 }}>
        <Navbar.Content css={{ width: "100%" }}>
          <Button
            auto
            shadow
            onClick={handler}
            css={{ width: "100%" }}
            className="btn-primary"
            iconRight={<FilterIcon />}
          >
            Ver Filtros
          </Button>
        </Navbar.Content>
      </Navbar>
    </Box>
  );
};
