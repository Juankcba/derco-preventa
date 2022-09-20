import React, { useState, useMemo, useEffect } from "react";

import { getVersionInfo, currency } from "../../../../utils";
import { cmsApi, storeApi } from "../../../../apis";
import {
  Grid,
  Text,
  Link,
  Row,
  Card,
  Input,
  Spacer,
  Button,
} from "@nextui-org/react";

import Image from "next/image";

import NextLink from "next/link";
import PreventaStep1 from "../../../../components/preventa/step1";
import PreventaStep2 from "../../../../components/preventa/step2";
import PreventaStep3 from "../../../../components/preventa/step3";

import { PreventaLayout } from "../../../../components/Layouts/PreventaLayout";
import { getVersionStoreInfo } from "./../../../../utils/getVersionStoreInfo";

// interface Props {
//   model: ModelResponse;
// }

const MantencionPage = ({ models }) => {
  const [step, setStep] = useState(1);
  const [user, setUser] = useState({
    rut: "",
    name: "",
    lastname: "",
    phone: "",
    email: "",
  });

  const [model, setModel] = useState({});
  useEffect(() => {
    if (models.length > 0) {
      setModel(models[0]);
    }
  }, [models]);

  return (
    <PreventaLayout
      title={`${model.model_name} | DercoCenter `}
      image={model.image_url}
    >
      <Text color="white">Preventa de Mantenciones</Text>
    </PreventaLayout>
  );
};

export async function getStaticPaths() {
  const {
    data: { mantenciones },
  } = await storeApi.get(
    `/pre-order/cyber-dc/${process.env.NEXT_PUBLIC_PREVENTA}/cars`
  );

  const patchUrls = mantenciones.map((mantencion) => ({
    version_slug: mantencion.version_slug,
    brand_slug: mantencion.brand_slug,
  }));

  return {
    paths: patchUrls.map((path) => ({
      params: { ...path },
    })),
    fallback: false, // can also be true or 'blocking'
  };
}

// `getStaticPaths` requires using `getStaticProps`
export const getStaticProps = async ({ params }) => {
  const { version_slug, brand_slug } = params;

  const models = await getVersionStoreInfo(`MANCAMI10`);

  console.log(models);

  if (!models) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    // Passed to the page component as props
    props: { models },
    revalidate: 86400,
  };
};

export default MantencionPage;
