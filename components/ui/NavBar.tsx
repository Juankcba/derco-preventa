import React, { useState, useContext, useEffect } from "react";
import {
  Navbar,
  Button,
  Link,
  Text,
  Dropdown,
  Avatar,
  Input,
  Loading,
  Row,
} from "@nextui-org/react";
import { AuthContext } from "../../context";
import NextLink from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { SearchIcon } from "./SearchIcon";
const NavBar = () => {
  const [searchTerms, setSearchTerms] = useState("");
  const [loading, setLoading] = useState(false);
  const { user, isLoggedIn, logout } = useContext(AuthContext);
  const router = useRouter();
  const navigateTo = (url: string) => {
    router.push(url);
  };
  const onSearchTerms = () => {
    if (searchTerms.trim().length === 0) return;
    setLoading(true);
    router.push(`/search/${searchTerms}`);
  };

  useEffect(() => {
    if (router.asPath.includes(`/search/${searchTerms}`)) {
      setLoading(false);
    }
    setTimeout(function () {
      setLoading(false);
    }, 5000);
  }, [router, searchTerms]);

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

      <Navbar.Content enableCursorHighlight>
        <NextLink href={"/"} passHref>
          <Navbar.Link itemCss={{ fontSize: "22px" }}>
            Cyber DercoCenter
          </Navbar.Link>
        </NextLink>
      </Navbar.Content>
      <Navbar.Content hideIn="sm" css={{}}>
        <Navbar.Item
          css={{
            "@smMax": {
              w: "100%",
              jc: "center",
            },
          }}
          onClick={onSearchTerms}
        >
          <Row justify="flex-start" align="center">
            <Input
              clearable
              onKeyPress={(e) => (e.key === "Enter" ? onSearchTerms() : null)}
              contentLeft={
                <SearchIcon fill="var(--nextui-colors-accents6)" size={16} />
              }
              contentLeftStyling={false}
              value={searchTerms}
              onChange={(e) => setSearchTerms(e.target.value)}
              css={{
                w: "100%",
                "@xsMax": {
                  mw: "300px",
                },
                "& .nextui-input-content--left": {
                  h: "100%",
                  ml: "$4",
                  dflex: "center",
                },
              }}
              placeholder="Buscar..."
            />
            {loading && <Loading size="xs" css={{ paddingLeft: "20px" }} />}
          </Row>
        </Navbar.Item>
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
      <Navbar.Toggle showIn="xs" />
    </Navbar>
  );
};

export default NavBar;
