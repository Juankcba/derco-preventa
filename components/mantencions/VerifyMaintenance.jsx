import { Button } from "@nextui-org/react";
import { useEffect, useState } from "react";
import {
  isBrowser,
  isMobile,
  isIOS,
  isTablet,
  isAndroid,
  osName,
} from "react-device-detect";

import { modelos } from "../../database/constants";

let marcas = []
modelos.map((modelo) => {
  let  idx = marcas.findIndex( (m)=> m.brand == modelo.brand )
  if ( idx == -1 ) {
    marcas = [...marcas, modelo]
  }
})

const VerifyMaintenance = ({ model, setStep, setMsg }) => {
  const handleStep = (value, msg = false) => {
    setStep(value);
    setMsg(msg)
    console.log(msg)
  };

  const [models, setModels] = useState([])

  const handleBrand = (e) => {
    let id = e.target.value
    let idx = marcas.findIndex( (m) => m.id == id )
    if ( idx > -1 ) {
      const  brand = marcas[idx].brand
      setModels( modelos.filter((m)=> m.brand ==  brand ) )
    }
  }

  return (
    <div className="verify_maintenance">
      <Button className="card__header__button btn-primary big" onPress={ ()=> handleStep(3) }>Pagar mantención</Button>
      <hr></hr>
      <div className="card__body">
        <h3 className="card__body__title">Si no estas seguro de que la mantención sea compatible con tu vehículo</h3>
        <span className="card__body__text">Ingresa los siguientes datos:</span>
        <div className="card__body__form">
          <select className="select_options" onChange={ handleBrand } >
            <option value="0" selected disabled>Selecciona la Marca</option>
            { marcas.map( (m, idx) => (
              <option key={ idx } value={m.id}>{m.brand}</option>
            )) }
          </select>
          <select className="select_options">
            <option value="0" selected disabled>Selecciona el Modelo</option>
            { models.map( (model, idx) => (
              <option key={ idx } value={model.id}>{model.model}</option>
            )) }
          </select>
          <Button className="button_verify btn-primary big" onPress={() => handleStep(2)}>Verificar mantención</Button>
        </div>
      </div>
      <div className="card_footer">
        <div className="card_footer__text">
          <span className="card_footer__text__title">Bases legales</span>
          <br />
          <span className="card_footer__text__subtitle">Hacer referencia a si mentiste o te equivocaste </span>
        </div>
      </div>
    </div>
  )
}

export default VerifyMaintenance
