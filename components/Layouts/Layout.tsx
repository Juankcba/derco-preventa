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
import Image from "next/image";
import NextLink from "next/link";
import NavBarCustom from "../ui/NavBar";
import { Box } from "../ui/Box";
import { UiContext } from "../../context";
import { FilterIcon } from "./../ui/FilterIcon";
import { link, linkSync } from "fs";

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

  const links = [
    { id: 1, url: "", name: "Descargar Instructivo Cyber Derco Center" },
    { id: 2, url: "", name: "Politicas de Privacidad" },
    { id: 3, url: "", name: "Información Corporativa" },
    { id: 4, url: "", name: "Términos y Condiciones" },
    { id: 5, url: "", name: "Bases Legales" },
  ];

  const socials = [
    { id: 1, image: "facebook", name: "Facebook" },
    { id: 2, image: "instagram", name: "Instragram" },
    { id: 3, image: "twitter", name: "Twitter" },
    { id: 4, image: "youtube", name: "Youtube" },
  ];

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
          padding: 0,
          minHeight: "84vh",
        }}
      >
        {children}
      </main>

      <footer className="footer-container">
        <Grid.Container>
          <Grid xs={12}>
            <NextLink href="tel:6006000080" passHref>
              <Link target="_blank">
                <div className="phone-container">
                  <Image
                    src={"/assets/img/phone.svg"}
                    alt="logo-tel"
                    width={40}
                    height={40}
                  />
                  <Row justify={"flex-start"} css={{ flexDirection: "column" }}>
                    <Text color="white" className="title">
                      Derco responde
                    </Text>
                    <Text color="white" className="subtitle">
                      600 600 0080
                    </Text>
                  </Row>
                </div>
              </Link>
            </NextLink>
          </Grid>
          {links.map((link) => (
            <Grid xs={12} key={link.id}>
              <NextLink href={link.url} passHref>
                <Link className="link-content" target="_blank">
                  {link.name}
                </Link>
              </NextLink>
            </Grid>
          ))}

          <div className="spacer-2" />

          <Grid
            xs={12}
            css={{ p: 0, m: "30px 0", flexDirection: "column" }}
            justify="flex-start"
          >
            <Text className="social-links">Encuéntranos en</Text>
            <Row
              justify="flex-start"
              css={{ marginTop: "20px", width: "100%", gap: "34px" }}
            >
              {socials.map((social) => (
                <Image
                  key={social.id}
                  src={`/assets/img/socials/${social.image}.svg`}
                  alt={social.name}
                  width={24}
                  height={24}
                />
              ))}
            </Row>
          </Grid>
          <div className="spacer-1" />
          <Text className="text-copy">
            © 2021. Todos los derechos reservados Derco SpA
          </Text>
        </Grid.Container>
      </footer>
      <Navbar variant="sticky" css={{ bottom: 0 }}>
        <Navbar.Content css={{ width: "100%" }}>
          <Button
            auto
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
