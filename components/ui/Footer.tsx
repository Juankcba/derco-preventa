import React from "react";
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
const Footer = () => {
  const links = [
    {
      id: 1,
      url: "https://s3.amazonaws.com/dercocenter.cl/cyber/legals/pregunta-frecuentes-promocion-cyber-dercocenter-220926.pdf",
      name: "Descargar Instructivo Cyber Derco Center",
    },
    {
      id: 2,
      url: "https://s3.amazonaws.com/dercocenter.cl/cyber/legals/politica-de-privacidad-y-tratamiento-de-datos-cyber-220926.pdf",
      name: "Politicas de Privacidad",
    },
    {
      id: 3,
      url: "https://www.dercocenter.cl/informacion-corporativa",
      name: "Información Corporativa",
    },
    {
      id: 4,
      url: "https://s3.amazonaws.com/dercocenter.cl/cyber/legals/terminos-y-condiciones-dercocenter-cyber-220915.pdf",
      name: "Términos y Condiciones",
    },
    {
      id: 5,
      url: "https://www.dercocenter.cl/bases-legales",
      name: "Bases Legales",
    },
  ];

  const socials = [
    {
      id: 1,
      image: "facebook",
      name: "Facebook",
      url: "https://www.facebook.com/DercoCenter",
    },
    {
      id: 2,
      image: "instagram",
      name: "Instragram",
      url: "https://www.instagram.com/dercocentercl",
    },
    {
      id: 3,
      image: "twitter",
      name: "Twitter",
      url: "https://twitter.com/DercoCenter/",
    },
    {
      id: 4,
      image: "youtube",
      name: "Youtube",
      url: "https://www.youtube.com/channel/UC02s7CbIT5wpNeE-ekJq-Wg",
    },
  ];
  return (
    <footer className="footer-container">
      <Grid.Container>
        <Grid xs={12} md={3}>
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
        <Grid xs={12} md={6}>
          <Grid.Container css={{ width: "100%" }}>
            <div className="spacer-2" />
            {links.map((link) => (
              <Grid xs={12} md={6} key={link.id}>
                <NextLink href={link.url} passHref>
                  <Link className="link-content" target="_blank">
                    {link.name}
                  </Link>
                </NextLink>
              </Grid>
            ))}
          </Grid.Container>
        </Grid>

        <Grid xs={12} md={3} className="socials" justify="flex-start">
          <Text className="social-links">Encuéntranos en</Text>
          <Row
            justify="flex-start"
            css={{
              marginTop: "20px",
              width: "100%",
              gap: "34px",
            }}
          >
            {socials.map((social) => (
              <NextLink key={social.id} href={social.url} passHref>
                <Link target={"_blank"}>
                  <Image
                    src={`/assets/img/socials/${social.image}.svg`}
                    alt={social.name}
                    width={24}
                    height={24}
                  />
                </Link>
              </NextLink>
            ))}
          </Row>
        </Grid>
        <div className="spacer-1" />
        <Text className="text-copy">
          © 2021. Todos los derechos reservados Derco SpA
        </Text>
      </Grid.Container>
    </footer>
  );
};

export default Footer;
