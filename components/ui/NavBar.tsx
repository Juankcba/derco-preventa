import React, { useState, useContext, useEffect, FC } from "react";
import {
  Navbar,
  Button,
  Link,
  Text,
  Dropdown,
  Grid,
  Avatar,
  Input,
  Loading,
  Row,
} from "@nextui-org/react";

import NextLink from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { SearchIcon } from "./SearchIcon";
interface Props {
  titlePage?: string;
}
const NavBar: FC<Props> = ({ titlePage }) => {
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

  const handleClick = () => {
    if (titlePage === "Preguntas Frecuentes") {
      window.open(
        "https://s3.amazonaws.com/dercocenter.cl/cyber/legals/pregunta-frecuentes-promocion-cyber-dercocenter-220926.pdf",
        "_ blank"
      );
    }
  };

  return (
    <Navbar
      maxWidth="fluid"
      isBordered
      variant="sticky"
      className="nav-header"
      css={{
        height: "62px",
        maxHeight: "62px",
        "@mdMin": { height: "90px", maxHeight: "90px" },
        zIndex: 10000,
        p: 0,
        m: 0,
      }}
    >
      <div className="nav-container">
        <div className="navbar-brand">
          <Navbar.Brand>
            <NextLink href={"/"} passHref>
              <a>
                <Image
                  src="/assets/img/dc.svg"
                  alt="dercocenter"
                  objectFit="contain"
                  width={110}
                  height={90}
                />
              </a>
            </NextLink>
          </Navbar.Brand>
        </div>
        {/* <div className="nav-red">
          No te preocupes, el 6 de Octubre volvemos a la normalidad y puedes
          cotizar en dercocenter.cl
        </div>  */}
        <div
          className={
            titlePage === "Preguntas Frecuentes"
              ? "nav-white link"
              : "nav-white"
          }
          onClick={() => handleClick()}
        >
          {titlePage}
        </div>
      </div>
    </Navbar>
  );
};

export default NavBar;
