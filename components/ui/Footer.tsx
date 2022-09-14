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
  );
};

export default Footer;
