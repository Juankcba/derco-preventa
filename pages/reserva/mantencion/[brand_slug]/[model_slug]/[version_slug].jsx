import React, { useState } from "react";

import { PreventaLayout } from "../../../../../components/Layouts";
import VerifyMaintenance from "../../../../../components/mantencions/VerifyMaintenance";
import ErrorVerifyMaintenance from "../../../../../components/mantencions/ErrorVerifyMaintenance";
import SuccessVerifyMaintenance from "../../../../../components/mantencions/SuccessVerifyMaintenance";
import ResultPayment from "../../../../../components/mantencions/ResultPayment";

import { Button } from "@nextui-org/react";

const MaintenancePage = () => {
  const [step, setStep] = useState(1);
  const [msg, setMsg] = useState(false);
  return (
    <PreventaLayout>
      <div
        className={`page_reserva_mantencion ${
          step == 3 || step == 4 || step == 5 ? "success" : ""
        }`}
      >
        <div
          className={`container ${
            step == 3 || step == 4 || step == 5 ? "success" : ""
          }`}
        >
          <img
            src="https://s3.amazonaws.com/dercocenter.cl/cyber/backgorund-page-maintenance.jpg"
            alt="mobile"
            className="img_mobile"
          />
          <div className="discount_mobile">
            <span className="discount__number">35%</span>
          </div>
          <div className="content">
            <div className="card">
              <div className="discount">
                <span className="discount__number">35%</span>
              </div>
              <div className="card__header">
                {(step == 1 || step == 2 || step == 3) && (
                  <div className="card__header__title">
                    <h3>Mantención Citycar 30.000km</h3>
                    <h4>$270.000*</h4>
                    <span className="card__header__title__discount">
                      Antes <span>$370.000</span>
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
              {step == 1 && (
                <VerifyMaintenance setStep={setStep} setMsg={setMsg} />
              )}
              {step == 2 && (
                <ErrorVerifyMaintenance setStep={setStep} setMsg={setMsg} />
              )}
              {step == 3 && (
                <SuccessVerifyMaintenance
                  setStep={setStep}
                  setMsg={setMsg}
                  msg={msg}
                />
              )}
              {(step == 4 || step == 5) && (
                <ResultPayment setStep={setStep} step={step} />
              )}
            </div>
            {step == 3 && (
              <div className="card_legals_desktop">
                <h3 className="title">
                  Al llenar el formulario precedente, usted:
                </h3>
                <ul className="list_legals">
                  <p>
                    1. Acepta ser contactado por Derco Chile S.A. y/o sus
                    sociedades relacionadas, red de concesionarios y/o Sociedad
                    de Créditos Automotrices S.A, para recibir información
                    relacionada a esta a través de medios electrónicos y/o de
                    forma telefónica, entre otros, conforme a la política de
                    privacidad de este sitio web.
                  </p>
                  <p>
                    2. Autoriza expresamente a Derco Chile S.A. y/o sus
                    sociedades relacionadas, red de concesionarios y/o Sociedad
                    de Créditos Automotrices S.A y a las terceras entidades
                    financieras a las que ésta información les sea enviada, para
                    utilizar, almacenar y tratar la misma y verificar sus datos
                    personales y comportamiento financiero, cuando corresponda,
                    sea en DICOM u otra base de datos necesarios para lograr
                    una.
                  </p>
                  <p>
                    3. Los datos proporcionados por el usuario erán utilizados
                    por Derco Chile S.A. y/o sus sociedades relacionadas, red de
                    concesionarios y/o Sociedad de Créditos Automotrices S.A
                    únicamente con la finalidad de que pueda comunicar éstos a
                    las distintas entidades financieras que podrían otorgar un
                    crédito automotriz al usuario.
                  </p>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </PreventaLayout>
  );
};

export default MaintenancePage;
