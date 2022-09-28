import React, { FC, useState, useEffect, useContext } from "react";
import { Text, Button, Row, Container, Modal, Link } from "@nextui-org/react";
import { currency } from "../../utils";
import { Box } from "../ui/Box";
import { FilterContext } from "../../context/filters/filterContext";
import { CarIcon } from "./../ui/CarIcon";
import NextLink from "next/link";

const SelectedFilterGeneral: FC = () => {
  const { isMantenciones, setMantencionesState } = useContext(FilterContext);
  const [visible, setVisible] = useState(false as boolean);
  const [size, setSize] = useState(true as boolean);
  const handleClick = (state: boolean) => {
    setMantencionesState(state);
  };

  const handlerModal = (state: boolean) => {
    setVisible(state);
  };

  useEffect(() => {
    if (window.screen.availWidth < 1281) {
      setSize(true);
    } else {
      setSize(false);
    }
  }, []);

  return (
    <Container css={{ padding: 0 }}>
      {!isMantenciones ? (
        <Text
          h1
          className="text-reserva"
          css={{ color: "white", textAlign: "center" }}
        >
          Todas las reservas son <span className="span-solo red">SOLO</span> por{" "}
          <span className="span-solo">{currency.format(200000)}</span>
        </Text>
      ) : (
        <>
          <Text
            h1
            className="text-reserva"
            css={{ color: "white", textAlign: "center" }}
          >
            Consigue <strong className="span-solo"> mantención</strong> para tu
            auto
          </Text>
          <Button
            color="secondary"
            className="btn-secondary"
            onPress={() => handlerModal(true)}
            css={{
              margin: "16px auto 0",
              fontWeight: 900,
              fontSize: "16px",
              width: "280px",
              height: "44px",
            }}
            iconRight={<CarIcon />}
          >
            ¿Como elegir mi mantención?
          </Button>
        </>
      )}
      <Container
        css={{
          paddingTop: "20px",
          "@mdMin": {
            display: "none",
          },
        }}
      >
        <Row className="btn-group">
          <Button
            type="button"
            className={
              !isMantenciones ? "btn-active group" : "btn-deactive group"
            }
            onPress={() => handleClick(false)}
          >
            Vehículos
          </Button>
          <Button
            type="button"
            className={
              isMantenciones ? "btn-active group" : "btn-deactive group"
            }
            onPress={() => handleClick(true)}
          >
            Mantenciones
          </Button>
        </Row>
      </Container>
      <Modal
        closeButton
        scroll
        width={size ? "312px" : "897px"}
        aria-labelledby="modal-matenciones"
        open={visible}
        onClose={() => handlerModal(false)}
      >
        <Modal.Header>
          <Text id="modal-title" size={20} b>
            Criterios para elegir la mantención para tu auto
          </Text>
        </Modal.Header>
        <Modal.Body>
          <Text>
            Durante este Cyber Derco Center ofrecemos mantenciones desde
            10.000km hasta 30.000 km. Es muy importante que selecciones la
            Categoría y kilometraje correcto para tu vehículo, así mantiene en
            vigencia la garantía de tu motor.
          </Text>
          <Text b>Para tener en cuenta </Text>
          <Text>
            Primero revisa la pauta de mantenimiento en el manual de tu
            vehículo. Recuerda que para mantener la garantía de tu vehículo
            debes realizar la mantención cada 10.000km o 12 meses.
          </Text>
          <Text>
            Es importante recalcar que el servicio técnico o mantenciones en
            Derco Center, sólo está disponible para los vehículos que sean de
            las marcas que se comercializan en Derco Center. Es decir, si tu
            vehículo es Suzuki, Mazda, Renault, JAC, Haval, GWM o Changan puedes
            realizar tu mantención en nuestras instalaciones.
          </Text>

          <Text b>¿Como se de que categoria es mi auto?</Text>
          <Text>
            Puedes utilizar el Verificador de Mantenciones, ingresando Marca y
            Modelo de tu vehículo, podremos decirte a qué categoría corresponde.
          </Text>
          <Text b>
            ¿Puedo hacer mi mantención de los 10.000km si mi vehículo tiene más
            kilómetros?
          </Text>
          <Text>
            La tolerancia para ajustar el servicio técnico entre kilometrajes es
            de 999km y mantener la garantía de motor. Es decir, si tu vehículo
            tiene 10.100km y haces la mantención de los 10.000km, aun conserva
            tu garantía oficial.
          </Text>
          <Text b>
            Mi vehículo no llega a los 10.000km pero ya pasó un año. ¿Debo hacer
            la siguiente mantención?
          </Text>
          <Text>
            Las mantenciones deben realizarse cada 10.000km o cada 12 meses, lo
            que suceda primero. Por lo que si tu vehículo es nuevo y aun no
            llega a sus 10.000km, pero lo tienes hace más de un año, le
            corresponde su primera mantención. Lo mismo aplica para los
            vehículos que ya hicieron alguna mantención, si aún no llegan a los
            10.000km desde el último servicio, pero fue hace más de 12 meses,
            deben realizar la siguiente mantención.
          </Text>

          <div
            className=" fit btn-primary red big auto"
            onClick={() => handlerModal(false)}
          >
            Verificar mi Manteción
          </div>

          <Text b>
            ¿Y si mi vehículo necesita la mantención de 40.000km o más?
          </Text>
          <Text>
            Para agendar mantenciones de 40.000km o más puedes realizar tu
            consulta o agendar un turno en nuestra web:
          </Text>
          <NextLink
            passHref
            href="https://serviciotecnico.dercocenter.cl/ReservaHora.aspx"
          >
            <Link target="_blank" className="fit btn-primary-outline auto">
              Mantención de 40.000km o más
            </Link>
          </NextLink>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default SelectedFilterGeneral;
