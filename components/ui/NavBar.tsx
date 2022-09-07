import React, { useState, useContext } from "react";
import {
  Navbar,
  Button,
  Link,
  Text,
  Dropdown,
  Avatar,
} from "@nextui-org/react";
import { AuthContext } from "../../context";
import NextLink from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
const NavBar = () => {
  const { user, isLoggedIn, logout } = useContext(AuthContext);
  const router = useRouter();
  const navigateTo = (url: string) => {
    router.push(url);
  };
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
      <Navbar.Content hideIn="sm" css={{}}>
        {!isLoggedIn && (
          <Navbar.Item>
            <Button
              auto
              flat
              onClick={() => navigateTo(`/auth/login?p=${router.asPath}`)}
            >
              Ingresar
            </Button>
          </Navbar.Item>
        )}
        {isLoggedIn && (
          <Dropdown placement="bottom-right">
            <Navbar.Item>
              <Dropdown.Trigger>
                <Avatar
                  bordered
                  as="button"
                  color="secondary"
                  size="md"
                  src={user?.image ? user.image : "/assets/img/avatar.jpg"}
                />
              </Dropdown.Trigger>
            </Navbar.Item>
            <Dropdown.Menu
              aria-label="User menu actions"
              color="secondary"
              onAction={(actionKey: any) =>
                actionKey != "logout" && router.push(actionKey)
              }
            >
              <Dropdown.Item key="/" css={{ height: "$18" }} color={"primary"}>
                <Text b color="inherit" css={{ d: "flex" }}>
                  Hola
                </Text>
                <Text b color="inherit" css={{ d: "flex" }}>
                  {user?.name}
                </Text>
              </Dropdown.Item>

              <Dropdown.Item key="/profile" withDivider>
                <NextLink href="/profile">
                  <Link>Mi Perfil</Link>
                </NextLink>
              </Dropdown.Item>

              <Dropdown.Item
                key="analytics"
                withDivider
                css={user?.role === "admin" ? {} : { display: "none" }}
              >
                Analytics
              </Dropdown.Item>
              <Dropdown.Item
                key="system"
                css={user?.role === "admin" ? {} : { display: "none" }}
              >
                System
              </Dropdown.Item>
              <Dropdown.Item
                key="configurations"
                css={user?.role === "admin" ? {} : { display: "none" }}
              >
                Configurations
              </Dropdown.Item>

              <Dropdown.Item
                key="logout"
                withDivider
                color="error"
                css={{ height: "$15" }}
              >
                <Button auto light color="error" flat onClick={() => logout()}>
                  Log Out
                </Button>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        )}
      </Navbar.Content>
    </Navbar>
  );
};

export default NavBar;
