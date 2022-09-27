import { Container, Grid, Loading, Row, Text, Button } from "@nextui-org/react";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { storeApi } from "../../../../../../../apis";
import { PreventaLayout } from "../../../../../../../components/Layouts";
import CardSummary from "../../../../../../../components/preventa/CardSummary";
import { DownloadCar } from "../../../../../../../components/ui/DownloadCar";
import { currency } from "../../../../../../../utils";

const TokenTransBank = () => {
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
          padding: "16px 24px",
          "@mdMin": {
            padding: "40px 0px",
            margin: "0 auto",
            maxWidth: "1240px",
          },
        }}
      >
        {loading ? (
          <Grid xs={12}>
            <Loading />
          </Grid>
        ) : (
          <>
            <Grid xs={12} md={7} css={{ padding: " 30px 12px 0px " }}>
              <Grid.Container css={{ maxHeight: "625px" }}>
                <Grid xs={4}>
                  <Image
                    src={`https://dercocenter-cl-static-prod.s3.amazonaws.com/assets/brands-logos/${order?.car?.brand?.slug}/logo-vertical-colors.svg`}
                    alt={order?.car?.brand?.name}
                    height={65}
                    width={102}
                  />
                </Grid>
                <Grid xs={8}>
                  <Row className="preventa-prices">
                    <Text className="price-primary">
                      {currency.format(order.car.brand_price)}*
                    </Text>
                    <Text className="price-before">
                      Antes <span>{currency.format(order.car.list_price)}</span>
                    </Text>
                    <Text className="price-bonos">
                      Bono cyber: {currency.format(order.car.brand_price)}
                    </Text>
                    <Text className="price-bonos">
                      Bono financiamiento:{" "}
                      {currency.format(order.car.brand_price)}
                    </Text>
                  </Row>
                </Grid>
                <Grid xs={12}>
                  <div
                    style={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <Image
                      src={order.car.image_url}
                      objectFit="contain"
                      objectPosition="center"
                      width={649}
                      height={360}
                      alt={order?.car?.model_name}
                    />
                  </div>
                </Grid>

                <Grid
                  xs={12}
                  justify="flex-end"
                  css={{ flexDirection: "column" }}
                >
                  <Text
                    className="preventa-disclaimer"
                    css={{ textAlign: "end" }}
                  >
                    *Modelo en imagen corresponde a {order?.car?.brand?.name}{" "}
                    {order?.car?.model_name}
                  </Text>

                  <div>
                    <Button
                      light
                      css={{ marginLeft: "auto" }}
                      iconRight={<DownloadCar />}
                      className="btn-primary-outline big wauto"
                    >
                      Descargar Ficha técnica
                    </Button>
                  </div>
                </Grid>
              </Grid.Container>
            </Grid>
            <Grid xs={12} md={5}>
              <CardSummary order={order} />
            </Grid>
          </>
        )}
      </Grid.Container>
    </PreventaLayout>
  );
};

export default TokenTransBank;
