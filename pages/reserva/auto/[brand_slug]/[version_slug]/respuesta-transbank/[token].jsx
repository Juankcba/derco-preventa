import { Container, Loading } from "@nextui-org/react";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { storeApi } from "../../../../../../apis";
import { PreventaLayout } from "../../../../../../components/Layouts";

const TokenTransBank = () => {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const getTokenInfo = async () => {
    try {
      await storeApi
        .get(`/pre-order/transaction/${router.query.token}`)
        .then((response) => {
          if (response.data.status === "0") {
            router.push();
          }
          console.log("response", response);
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTokenInfo();
  }, [router]);

  return (
    <PreventaLayout>
      <Container
        css={{ pt: "20px", display: "flex", justifyContent: "center" }}
      >
        {loading && <Loading />}
      </Container>
    </PreventaLayout>
  );
};

export default TokenTransBank;
