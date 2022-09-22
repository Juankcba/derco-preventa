import { PreventaLayout } from "../../../../components/Layouts"
import VerifyMaintenance from "../../../../components/mantencions/VerifyMaintenance";
import ErrorVerifyMaintenance from "../../../../components/mantencions/ErrorVerifyMaintenance";
import SuccessVerifyMaintenance from "../../../../components/mantencions/SuccessVerifyMaintenance";

import React, { useState } from "react";
import { Button } from "@nextui-org/react";

const MaintenancePage = () => {
  const [step, setStep] = useState(1);
  return (
    <PreventaLayout>
      <div className={`page_reserva_mantencion ${step == 3 ? 'success' : ''}`}>
        <div className="container">
          <img src="https://s3.amazonaws.com/dercocenter.cl/cyber/backgorund-page-maintenance.jpg" alt="mobile" className="img_mobile" />
          <div className="discount_mobile">
            <span className="discount__number">35%</span>
          </div>
          <div className="content">
            <div className="card">
              <div className="discount">
                <span className="discount__number">35%</span>
              </div>
              <div className="card__header">
                <div className="card__header__title">
                  <h3>Mantención Citycar 30.000km</h3>
                  <h4>$270.000*</h4>
                  <span className="card__header__title__discount">Antes <span>$370.000</span></span>
                </div>
              </div>
              {step == 1 && (<VerifyMaintenance setStep={setStep} />)}
              {step == 2 && (<ErrorVerifyMaintenance setStep={setStep} />)}
              {step == 3 && (<SuccessVerifyMaintenance setStep={setStep} />)}
            </div>
          </div>
        </div>
      </div>
    </PreventaLayout >
  );
};

export default MaintenancePage;