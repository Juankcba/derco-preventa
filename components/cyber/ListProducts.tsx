import React, { useEffect, useMemo, FC, useContext } from "react";
import { NextPage, GetStaticProps } from "next";

import { Version, VersionResponse } from "../../interfaces";
import { PropsWithChildren, useState } from "react";

import { Grid, Card, Text, Row, styled, Button } from "@nextui-org/react";
import { cmsApi } from "../../apis";
import Filters from "../ui/Filters";
import VersionCard from "./../cars/VersionCard";
import { FilterContext } from "./../../context/filters/filterContext";

interface Props {
  versions: Version[];
}

const ListProducts: FC<Props> = ({ versions }) => {
  const { order, indexOfCards, setIndex } = useContext(FilterContext);
  const [versiones, setVersiones] = useState(versions.slice(0, 4));

  useEffect(() => {
    if (order === "dsc") {
      setVersiones(
        versions
          .sort((a, b) => a.minPrice - b.minPrice)
          .slice(0, 4 * indexOfCards)
      );
    } else {
      setVersiones(
        versions
          .sort((a, b) => b.minPrice - a.minPrice)
          .slice(0, 4 * indexOfCards)
      );
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [order, indexOfCards]);

  const handleMore = () => {
    let indexData = indexOfCards + 1;
    setIndex(indexData);
  };
  return (
    <Grid.Container
      gap={2}
      justify="flex-start"
      css={{
        padding: 0,
        "@mdMin": {
          maxWidth: "1080px",
          margin: "0 auto",
        },
      }}
    >
      {versiones.map((version: Version) => (
        <Grid
          xs
          md={3}
          key={version.id}
          css={{
            display: "flex",
            justifyContent: "center",
            paddingLeft: 0,
            paddingRight: "8px",
          }}
        >
          <VersionCard version={version} />
        </Grid>
      ))}
      <Grid xs={12} justify="center" css={{ marginTop: "16px" }}>
        <Button onClick={handleMore} className="btn-secondary">
          Ver más
        </Button>
      </Grid>
    </Grid.Container>
  );
};

export default ListProducts;
