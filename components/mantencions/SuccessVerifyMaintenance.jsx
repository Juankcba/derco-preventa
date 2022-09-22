import { Button, Checkbox } from "@nextui-org/react";
import NextImage from "next/image";

const VerifyMaintenance = ({ setStep }) => {
  const handleStep = (value) => {
    setStep(value);
  };
  return (
    <div className="success_verify_maintenance">
      <hr></hr>
      <div className="card__body">
        <h3 className="card__body__title">Tu [Marca] [Modelo] corresponde a la Categoría [Categoria] y a la mantención de [kilometraje].</h3>
        <div className="message_success success">
          <span className="message_success__text">Seleccionaste correctamente tu mantención</span>
          <NextImage
            src="/assets/img/check.svg"
            height={34}
            width={34}
            alt="cyber-coin"
          />
        </div>
        <span className="card__body__text">Te solicitamos los últimos datos, para que todo este listo en tu mantencion de los [kilometros]</span>
        <div className="card__body__form__success">
          <input className="form_input" type="text" placeholder="Ingresa tu Patente" />
          <input className="form_input" type="text" placeholder="Kilometraje actual" />
          <select className="select_options">
            <option value="0" selected disabled>Concesionario para mantención</option>
            <option value="1">consecionario 1</option>
            <option value="2">consecionario 2</option>
          </select>
        </div>
        <hr></hr>
        <span className="card__body__title">Datos de contacto:</span>
        <div className="card__body__form__success">
          <input className="form_input" type="text" placeholder="Ingresa tu RUT" />
          <input className="form_input" type="text" placeholder="Ingresa tu Nombre" />
          <input className="form_input" type="text" placeholder="Ingresa tu Apellido" />
          <input className="form_input" type="text" placeholder="Ingresa tu número de Celular" />
          <input className="form_input" type="text" placeholder="Ingresa tu correo" />
        </div>
        <hr></hr>
        <Checkbox defaultSelected={false} className="checkbox_acept">
          <span>Acepto los <span className="danger">Términos y condiciones</span> de privacidad y ser contactado por Derco SpA*</span>
        </Checkbox>
        <h3 className="title_price">Valor reserva $270.000</h3>
        <Button className="button_verify btn-primary big" onPress={() => handleStep(4)}>Paga online</Button>
        <NextImage src="/assets/img/icon-transbank.svg" height={48} width={439} alt="cyber-coin" className="img_transbank" />
      </div>
      <div className="content_btn">
        <Button light color="error" auto className="btn" onPress={() => handleStep(1)}>
          Regresar a “Verificar mantención”
        </Button>
      </div>
    </div>
  )
}

export default VerifyMaintenance
