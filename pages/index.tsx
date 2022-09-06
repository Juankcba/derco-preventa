import { NextPage, GetStaticProps } from "next";
import Head from "next/head";
import Image from "next/image";
import { cmsApi } from "../components/apis";
import { Layout } from "../components/Layouts";
import { Version, VersionResponse } from "../interfaces";
import { PropsWithChildren } from "react";

import { Grid, Card, Text, Row } from "@nextui-org/react";

interface Props {
  versions: Version[];
}

const HomePage: NextPage<PropsWithChildren<Props>> = ({ versions }) => {
  console.log("data", versions);

  const onClick = () => {
    console.log("click");
  };
  return (
    <Layout title="CiberMonday | DercoCenter">
      <Grid.Container>
        <Grid xs={12} className="content-result">
          <Grid.Container gap={2} justify="flex-start">
            {versions.map((version) => (
              <Grid xs={6} sm={3} md={3} xl={2} key={version.id}>
                <Card isHoverable isPressable onClick={onClick}>
                  <Card.Body css={{ p: 1 }}>
                    <Card.Image
                      src={version.image.url}
                      width="100%"
                      height={140}
                    />
                  </Card.Body>
                  <Card.Footer>
                    <Row justify="flex-start" css={{ flexDirection: "column" }}>
                      <Text h2 size={16}>
                        {version.name}
                      </Text>
                      <Text h3 size={14}>
                        {version.model.name}
                      </Text>
                    </Row>
                  </Card.Footer>
                </Card>
              </Grid>
            ))}
          </Grid.Container>
        </Grid>
      </Grid.Container>
    </Layout>
  );
};

export async function getStaticProps() {
  const { data } = await cmsApi.get<VersionResponse>("/versions");

  const versions: VersionResponse = data;

  return {
    props: { versions },
  };
}

export default HomePage;
