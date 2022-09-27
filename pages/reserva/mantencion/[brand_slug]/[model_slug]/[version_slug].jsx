import React, { useState, useEffect } from "react";

import { PreventaLayout } from "../../../../../components/Layouts"
import VerifyMaintenance from "../../../../../components/mantencions/VerifyMaintenance";
import ErrorVerifyMaintenance from "../../../../../components/mantencions/ErrorVerifyMaintenance";
import SuccessVerifyMaintenance from "../../../../../components/mantencions/SuccessVerifyMaintenance";
import ResultPayment from "../../../../../components/mantencions/ResultPayment";

import { Button } from "@nextui-org/react";

import { storeApi } from "../../../../../apis";
import { currency } from "../../../../../utils";
import {
  getSubsStoreInfo,
  getVersionStoreInfo,
} from "../../../../../utils/getVersionStoreInfo";

const MaintenancePage = ({ models, regions }) => {
  const [step, setStep] = useState(1);
  const [model, setModel] = useState({})
  const [msg, setMsg] = useState(false);

  const percen = (model) => {
    return  ( ( (model.brand_price - model.list_price) / model.list_price) * -100 ).toFixed(0)
  }
  
  const [data, setData] = useState({
    user: {
      rut: "",
      first_name: "",
      last_name: "",
      phone: "",
      email: "",
    },
    ces: "",
    financial: "",
    model: "",
  });

  useEffect(() => {
    if ( models?.length > 0 ) {
      setModel( models[0] )
      setData({ ...data, model: models[0] });
    }
  }, [models])
  

  return (
    <PreventaLayout>
      <div className={`page_reserva_mantencion ${step == 3 || step == 4 || step == 5 ? 'success' : ''}`}>
        <div className={`container ${step == 3 || step == 4 || step == 5 ? 'success' : ''}`}>
          <img src="https://s3.amazonaws.com/dercocenter.cl/cyber/backgorund-page-maintenance.jpg" alt="mobile" className="img_mobile" />
          <div className="discount_mobile">
            <span className="discount__number">
            {percen(model)}%
            </span>
          </div>
          <div className="content">
            <div className="card">
              <div className="discount">
                <span className="discount__number">
                  {percen(model)}%
                </span>
              </div>
              <div className="card__header">
                {(step == 1 || step == 2 || step == 3) && (
                  <div className="card__header__title">
                    <h3>{ model.version_name  } km</h3>
                    <h4> { currency.format(model.brand_price) }</h4>
                    <span className="card__header__title__discount">Antes 
                      <span>{currency.format(model.list_price)}</span>
                    </span>
                  </div>
                )}
                {step == 4 && (
                  <div className="card__header__title payment">
                    <h3>¡Compraste una mantención de 30.000 km!</h3>
                    <span className="card__subtitle">Sofia Losada Luna</span>
                  </div>
                )}
              </div>
              {step == 1 && (<VerifyMaintenance model={model} setStep={setStep} setMsg={setMsg} />)}
              {step == 2 && (<ErrorVerifyMaintenance setStep={setStep} setMsg={setMsg} />)}
              {step == 3 && (<SuccessVerifyMaintenance model={model} regions={ regions } setStep={setStep} setMsg={setMsg} msg={msg} />)}
              {(step == 4 || step == 5) && (<ResultPayment setStep={setStep} step={step} />)}
            </div>
            {step == 3 && (
              <div className="card_legals_desktop">
                <h3 className="title">Al llenar el formulario precedente, usted:</h3>
                <ul className="list_legals">
                  <p>1. Acepta ser contactado por Derco Chile S.A. y/o sus sociedades relacionadas, red de concesionarios y/o Sociedad de Créditos Automotrices S.A, para recibir información relacionada a esta a través de medios electrónicos y/o de forma telefónica, entre otros, conforme a la política de privacidad de este sitio web.</p>
                  <p>2. Autoriza expresamente a Derco Chile S.A. y/o sus sociedades relacionadas, red de concesionarios y/o Sociedad de Créditos Automotrices S.A y a las terceras entidades financieras a las que ésta información les sea enviada, para utilizar, almacenar y tratar la misma y verificar sus datos personales y comportamiento financiero, cuando corresponda, sea en DICOM u otra base de datos necesarios para lograr una.</p>
                  <p>3. Los datos proporcionados por el usuario erán utilizados por Derco Chile S.A. y/o sus sociedades relacionadas, red de concesionarios y/o Sociedad de Créditos Automotrices S.A únicamente con la finalidad de que pueda comunicar éstos a las distintas entidades financieras que podrían otorgar un crédito automotriz al usuario.</p>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </PreventaLayout >
  )
}

export async function getStaticPaths() {
  const {
    data: { mantenciones },
  } = await storeApi.get(
    `/pre-order/cyber-dc/${process.env.NEXT_PUBLIC_PREVENTA}/cars`
  );

  const patchUrls = mantenciones.map((version) => ({
    version_slug: version.version_slug,
    brand_slug: version.brand_slug,
    model_slug: version.model_slug
  }));

  console.log(patchUrls);

  return {
    paths: patchUrls.map((path) => ({
      params: { ...path },
    })),
    // { fallback: false } means other routes should 404
    fallback: false, // can also be true or 'blocking'
  };
}

// `getStaticPaths` requires using `getStaticProps`
export const getStaticProps = async ({ params }) => {
  const { version_slug, brand_slug } = params;

  const models = await getVersionStoreInfo(`${model_slug}/${version_slug}`);

  const { status, data } = await getSubsStoreInfo(
    `subsidiaries?brand_slug=${brand_slug}&services=mantencion`
  );
  let regions = [];
  if (status == 200) {
    regions = data;
  }

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
    props: { models, regions },
    revalidate: 1,
  };
};


export default MaintenancePage;
