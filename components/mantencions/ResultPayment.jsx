import { Button, Checkbox } from "@nextui-org/react";
import NextImage from "next/image";

const ResultPayment = ({ setStep, step }) => {
  const handleStep = (value) => {
    setStep(value);
  };
  return (
    <div className="success_verify_maintenance result">
      <div className="card__body">
        {step == 4 && (<div>
          <div className="message_success success result">
            <span className="message_success__text">Tu código de mantención es</span>
            <span className="code">765PR5fff4dc0576b4</span>
          </div>
          <h4 className="title">Te enviaremos los detalles a tu correo junto con la factura de tu compra, en las siguientes 48hs.</h4>
          <span className="info">Linea para agendar tu mantención de Lunes a Viernes entre las 10 a 18 hs.</span>
          <Button className="btn-primary big" onPress={() => handleStep(3)}>
            Llama para agendar
            <NextImage
              src="/assets/img/phone-white.svg"
              height={16}
              width={16}
              alt="phone"
            />
          </Button>
        </div>
        )}
        {step == 5 && (<div>
          <h3 className="card__body__title">Sofia Losada Luna</h3>
          <span className="card__body__text">Hemos tenido problemas al procesar el pago</span>
          <div className="message_success error">
            <div>
              <p className="message_success__text">Su transacción fue rechazada</p>
              <span>Su tarjeta cuenta con un límite estrablecido, intente con otra tarjeta.</span>
            </div>
            <img
              src="/assets/img/ion_warning-outline.svg"
              height="23.78"
              width="25.3"
              alt="cyber-coin"
            />
          </div>
          <p className="error_info">Tu compra no se ha realizado</p>
          <span className="error_text">Valor mantención  $270.000 </span>
          <Button className="btn-primary big" onPress={() => handleStep(4)}>Reintentar pago</Button>
          <NextImage src="/assets/img/icon-transbank.svg" height={48} width={439} alt="cyber-coin" className="img_transbank" />
          <Button className="button_verify btn-primary big" onPress={() => handleStep(1)}>Volver al home</Button>
        </div>
        )}
        <hr></hr>
        <div className="result_info">
          <p className="title">Patente: <span className="text">BBBB10</span></p>
          <p className="title">Kilometraje actual: <span className="text">28.000 km</span></p>
          <p className="title">Concesionario seleccionado: <span className="text">Automotrices</span></p>
          <br />
          <p className="title">Nombre: <span className="text">Sofia Diaz</span></p>
          <p className="title">Rut: <span className="text">34534543</span></p>
          <p className="title">Celular: <span className="text">13123123</span></p>
          <p className="title">Email: <span className="text">sofia@gmail.com</span></p>
        </div>
        <hr></hr>
        <div className="result_info">
          <p className="title">Fecha transacción: <span className="text">13/09/2022 16:44</span></p>
          <p className="title">Tarjeta: <span className="text">XXXX XXXX 5465</span></p>
          <p className="title">Código de autorización: <span className="text">511123</span></p>
          <p className="title">Tipo de venta: <span className="text">Venta normal</span></p>
          <p className="title">Valor: <span className="text">$270.000</span></p>
        </div>
        <hr></hr>

        <h3 className="title_help">¿Tienes dudas?</h3>
        <span className="info_help">No te preocupes, llámanos o escríbenos y te ayudamos.</span>
        <Button className="button_verify btn-primary big" onPress={() => handleStep(5)}>Llámanos al 600 600 800</Button>
      </div>
    </div>
  )
}

export default ResultPayment
