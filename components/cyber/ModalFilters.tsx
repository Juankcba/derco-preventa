import {
  Modal,
  Text,
  Input,
  Row,
  useModal,
  Container,
  Card,
  Grid,
  Badge,
  Avatar,
  Button,
  Radio,
} from "@nextui-org/react";
import React, { FC, useContext, useState, useEffect } from "react";
import { UiContext, FilterContext } from "../../context";
import { categorias, marcas } from "../../database/constants";

interface CateorySelected {
  id: Number[];
}

const ModalFilters: FC = () => {
  const { isModalOpen, setVisible } = useContext(UiContext);
  const {
    filterCarClass,
    isMantenciones,
    isDiesel,
    filterBrand,
    filterMantenciones,
    setIndex,
    setIndexMant,
    setFilterBrand,
    setFilterCombustible,
    setFilterCarClass,
    setFilterMantenciones,
  } = useContext(FilterContext);
  const [categorySelected, setCategorySelected] = useState(
    filterCarClass as number[]
  );
  const [marcasSelected, setMarcasSelected] = useState(filterBrand as number[]);
  const [mantencionesSelected, setMantencionesSelected] = useState(
    filterMantenciones as string
  );
  const [combustibleSelected, setCombustibleSelected] = useState(
    isDiesel as boolean
  );

  const closeHandler = () => {
    setVisible(false);
    console.log("closed");
  };

  const handleFilterCategory = (id: number) => {
    let aux = [];
    if (categorySelected.includes(id)) {
      aux = categorySelected.filter((c) => c != id);
    } else {
      if (categorySelected.length > 0) {
        aux = [...categorySelected, id];
      } else {
        aux.push(id);
      }
    }
    setCategorySelected(aux);
  };
  const handleFilterBrand = (id: number) => {
    let aux = [];
    if (marcasSelected.includes(id)) {
      aux = marcasSelected.filter((c) => c != id);
    } else {
      if (marcasSelected.length > 0) {
        aux = [...marcasSelected, id];
      } else {
        aux.push(id);
      }
    }
    setMarcasSelected(aux);
  };
  const handleCombustible = (state: any) => {
    if (state == "diesel") {
      setCombustibleSelected(true);
    } else {
      setCombustibleSelected(false);
    }
  };

  const handleFilters = () => {
    setFilterBrand(marcasSelected);
    setFilterCombustible(combustibleSelected);
    setFilterCarClass(categorySelected);
    setFilterMantenciones(mantencionesSelected);
    setIndexMant(1);
    setIndex(1);
    closeHandler();
  };

  return (
    <Modal
      scroll
      fullScreen
      closeButton
      aria-labelledby="filters"
      aria-describedby="modal-filters"
      open={isModalOpen}
      onClose={closeHandler}
      css={{ bgColor: "white" }}
    >
      <Modal.Body>
        <Container
          justify="flex-start"
          css={{ padding: 0, flexDirection: "column" }}
        >
          <Text h1>Filtros</Text>
          <Text>Puedes seleccionar mas de una opción de filtro.</Text>
          <Grid.Container>
            <Grid
              xs={12}
              md={4}
              css={{ display: "flex", flexDirection: "column", width: "100%" }}
            >
              <Text h4>
                {isMantenciones ? "¿Qué auto tienes?" : "Categorías"}
              </Text>
              <Grid.Container gap={0.5} css={{ maxWidth: "390px" }}>
                {categorias.map((categoria) => (
                  <Grid
                    xs={3}
                    key={categoria.id}
                    css={{
                      flexDirection: "column",
                      width: "72px",
                      maxW: "88px",
                      maxH: "88px",
                      height: "72px",
                    }}
                    justify="center"
                  >
                    <Badge
                      onClick={() => handleFilterCategory(categoria.id)}
                      disableOutline
                      content="X"
                      size="xs"
                      css={{ p: "0", color: "white", bgColor: "black" }}
                      horizontalOffset="0%"
                      verticalOffset="2%"
                      isInvisible={
                        categorySelected.filter((c) => c === categoria.id)
                          .length == 0
                          ? true
                          : false
                      }
                    >
                      <Card
                        variant="flat"
                        isPressable
                        className="filter-card-category"
                        onClick={() => handleFilterCategory(categoria.id)}
                        css={{
                          width: "72px",
                          height: "72px",
                          margin: "0 auto",
                          border:
                            categorySelected.filter((c) => c === categoria.id)
                              .length > 0
                              ? "3px solid #E0102C"
                              : "none",
                        }}
                      >
                        <Card.Image
                          src={categoria.imagen}
                          objectFit="contain"
                          width={"90%"}
                          height={50}
                          alt={categoria.name}
                        />

                        <Text className="img-name">{categoria.name}</Text>
                      </Card>
                    </Badge>
                  </Grid>
                ))}
              </Grid.Container>
            </Grid>
            {isMantenciones && (
              <Grid
                xs={12}
                md={4}
                css={{
                  display: "flex",
                  flexDirection: "column",
                  width: "100%",
                }}
              >
                <Text h4 css={{ "@mdMax": { marginTop: "16px" } }}>
                  ¿Que mantención te corresponde?
                </Text>
                <Radio.Group
                  orientation="horizontal"
                  onChange={setMantencionesSelected}
                  value={mantencionesSelected}
                >
                  <Radio value="10mil">10mil Km</Radio>
                  <Radio value="20mil">20mil Km</Radio>
                  <Radio value="30mil">30mil Km</Radio>
                </Radio.Group>
              </Grid>
            )}

            {!isMantenciones && (
              <Grid
                xs={12}
                md={4}
                css={{
                  display: "flex",
                  flexDirection: "column",
                  width: "100%",
                }}
              >
                <Text h4 css={{ "@mdMax": { marginTop: "16px" } }}>
                  Marcas
                </Text>
                <Grid.Container gap={0.5} css={{ maxWidth: "390px" }}>
                  {marcas.map((marca) => (
                    <Grid
                      xs={3}
                      key={marca.id}
                      css={{ flexDirection: "column" }}
                      justify="center"
                    >
                      <Badge
                        onClick={() => handleFilterBrand(marca.id)}
                        content="X"
                        css={{ p: "0", color: "white", bgColor: "black" }}
                        placement="top-right"
                        horizontalOffset="4%"
                        verticalOffset="2%"
                        shape="circle"
                        size="md"
                        isInvisible={
                          marcasSelected.filter((m) => m === marca.id).length ==
                          0
                            ? true
                            : false
                        }
                      >
                        <Avatar
                          onClick={() => handleFilterBrand(marca.id)}
                          className="filter-avatar"
                          size="xl"
                          css={{
                            margin: "0 auto",

                            border:
                              marcasSelected.filter((c) => c === marca.id)
                                .length > 0
                                ? "3px solid #E0102C"
                                : "none",
                          }}
                          src={marca.imagen}
                        />
                      </Badge>
                      <Text className="img-name">{marca.name}</Text>
                    </Grid>
                  ))}
                </Grid.Container>
              </Grid>
            )}
            {!isMantenciones && (
              <Grid
                xs={12}
                md={4}
                css={{
                  display: "flex",
                  flexDirection: "column",
                  width: "100%",
                }}
              >
                <Text h4 css={{ "@mdMax": { marginTop: "16px" } }}>
                  Tipo de combustible
                </Text>
                <Radio.Group
                  orientation="horizontal"
                  onChange={handleCombustible}
                  value={combustibleSelected ? "diesel" : "gasolina"}
                >
                  <Radio value="diesel">Diesel</Radio>
                  <Radio value="gasolina">Bencina</Radio>
                </Radio.Group>
              </Grid>
            )}
          </Grid.Container>
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Container fluid>
          <Button
            className="big"
            css={{ width: "100%" }}
            disabled={
              categorySelected.length == 0 && marcasSelected.length == 0
                ? true
                : false
            }
            onClick={handleFilters}
          >
            Aplicar filtros
          </Button>
        </Container>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalFilters;
