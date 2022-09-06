import React from "react";
import { Navbar, Button, Link, Text } from "@nextui-org/react";
import NextLink from "next/link";
import Image from "next/image";
const NavBar = () => {
  return (
    <Navbar maxWidth="fluid" isBordered variant="sticky">
      <Navbar.Brand>
        <NextLink href={"/"} passHref>
          <Link>
            <Image
              src="/assets/img/dercocenter.svg"
              alt="dercocenter"
              width={90}
              height={90}
            />
          </Link>
        </NextLink>
      </Navbar.Brand>
    </Navbar>
  );
};

export default NavBar;
