import { Link, Text } from "@nextui-org/react";
import React from "react";
import { Layout } from "../components/Layouts";
import NextLink from "next/link";
export default function Custom404() {
  return (
    <Layout title="404 - Página no encontrada | DercoCenter">
      <Text color="white">Ups</Text>
      <NextLink href="/" passHref>
        <Link> Volver al Home</Link>
      </NextLink>
    </Layout>
  );
}
