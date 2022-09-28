import { Card, Grid, Loading, Text } from "@nextui-org/react";

import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { storeApi } from "../../../../../../../apis";
import { PreventaLayout } from "../../../../../../../components/Layouts";
import CardSummaryReserva from "../../../../../../../components/mantencions/CardSummaryReserva";
import CardSummary from "../../../../../../../components/preventa/CardSummary";

const TokenMantencionesPage = () => {
  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState(null);
  const router = useRouter();

  const getTokenInfo = async (url) => {
    try {
      await storeApi.get(`/pre-order/transaction/${url}`).then((response) => {
        setOrder(response.data);
        setLoading(false);
        console.log("response", response);
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (router.query.token) {
      getTokenInfo(router.query.token);
    }
  }, [router]);

  return (
    <PreventaLayout>
      <Grid.Container
        gap={2}
        justify="center"
        css={{
          width: "100%",
          minHeight: "800px",
          padding: "0px",
          margin: "0 auto",
          backgroundImage:
            "url(" +
            `https://s3.amazonaws.com/dercocenter.cl/cyber/backgorund-page-maintenance.jpg` +
            ")",
          backgroundRepeat: "no-repeat",
        }}
      >
        {loading ? (
          <Grid xs={12} css={{ marginTop: "40px", width: "100%" }}>
            <Loading />
          </Grid>
        ) : (
          <>
            <Grid xs={12} md={5} css={{ "@mdMin": { margin: "0 0 0 auto" } }}>
              <CardSummaryReserva order={order} mantencion={true} />
            </Grid>
          </>
        )}
      </Grid.Container>
    </PreventaLayout>
  );
};

export default TokenMantencionesPage;
