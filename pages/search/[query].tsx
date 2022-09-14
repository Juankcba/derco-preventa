import { Grid, Text } from "@nextui-org/react";
import React from "react";
import { Layout } from "../../components/Layouts";
import type { NextPage, GetServerSideProps } from "next";
import { Version, VersionResponse } from "../../interfaces";
import { cmsApi } from "../../apis/";
import { getVersionInfo } from "../../utils";
import { Box } from "../../components/ui/Box";
import VersionCard from "../../components/cars/VersionCard";

interface Props {
  products: Version[];
  foundProducts: boolean;
  query: string;
}

const SearchPage: NextPage<Props> = ({ products, foundProducts, query }) => {
  console.log(products);
  return (
    <Layout title="Busqueda | DercoCenter">
      <Grid.Container css={{ marginTop: "5px" }} gap={2}>
        {foundProducts ? (
          <Text h2 css={{ mb: 1 }}>
            Resultado de busqueda : {" "}
            <span style={{ textTransform: "uppercase" }}>{query}</span>
          </Text>
        ) : (
          <Box>
            <Text h2 css={{ mb: 1 }}>
              No encontramos ningún producto
            </Text>
            <Text
              h2
              css={{ ml: 1, textTransform: "capitalize" }}
              color="secondary"
            >
              {query}
            </Text>
          </Box>
        )}
        <Grid.Container gap={2} justify="flex-start">
          {products.map((product) => (
            <VersionCard key={product.id} version={product} />
          ))}
        </Grid.Container>
      </Grid.Container>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { query = "" } = params as { query: string };

  if (query.length === 0) {
    return {
      redirect: {
        destination: "/",
        permanent: true,
      },
    };
  }
  const { data } = await cmsApi.get<VersionResponse>("/versions");

  const versionsData: any = data;
  // y no hay productos

  let products: any[] = versionsData.filter(
    (version: any) =>
      version.name.toLowerCase().includes(query.toLowerCase()) ||
      version.model.carClass.filter((mcc: string) =>
        mcc.toLowerCase().includes(query.toLowerCase())
      ).length > 0 ||
      version.model.name.toLowerCase().includes(query.toLowerCase()) ||
      version.model.brandName.toLowerCase() == query.toLowerCase() ||
      version.transmission == query.toLowerCase()
  );

  const foundProducts = products.length > 0;

  // TODO: retornar otros productos
  if (!foundProducts) {
    // products = await dbProducts.getAllProducts();
    products = versionsData;
  }

  return {
    props: {
      products,
      foundProducts,
      query,
    },
  };
};

export default SearchPage;
