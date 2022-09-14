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

import NextLink from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { SearchIcon } from "./SearchIcon";
const NavBar = () => {
  const [searchTerms, setSearchTerms] = useState("");
  const [loading, setLoading] = useState(false);

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
      </Navbar.Content>
      <Navbar.Toggle showIn="xs" />
    </Navbar>
  );
};

export default NavBar;
