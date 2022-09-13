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
import { UiContext } from "../../context/ui";

interface CateorySelected {
  id: Number[];
}

const ModalFilters: FC = () => {
  const { isModalOpen, setVisible } = useContext(UiContext);
  const [categorySelected, setCategorySelected] = useState([] as number[]);
  const [marcasSelected, setMarcasSelected] = useState([] as number[]);
  const [combustibleSelected, setCombustibleSelected] = useState("diesel");

  const closeHandler = () => {
    setVisible(false);
    console.log("closed");
  };

  const categorias = [
    {
      id: 1,
      name: "Camioneta",
      imagen: "/assets/img/carClasses/camioneta.png",
    },
    {
      id: 2,
      name: "Sedán",
      imagen: "/assets/img/carClasses/sedan.png",
    },
    {
      id: 3,
      name: "Hatchback",
      imagen: "/assets/img/carClasses/hatchback.png",
    },
    {
      id: 4,
      name: "SUV",
      imagen: "/assets/img/carClasses/suv.png",
    },
  ];

  const marcas = [
    {
      id: 1,
      name: "Haval",
      imagen: "/assets/img/brands/haval.png",
    },
    {
      id: 2,
      name: "JAC",
      imagen: "/assets/img/brands/jac.png",
    },
    {
      id: 3,
      name: "GWM",
      imagen: "/assets/img/brands/gwm.png",
    },
    {
      id: 4,
      name: "Changan",
      imagen: "/assets/img/brands/changan.png",
    },
  ];

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

  console.log("aux", categorySelected, marcasSelected);
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
        <Container css={{ padding: 0 }}>
          <Text h1>Filtros</Text>
          <Text>Puedes seleccionar mas de una opción de filtro.</Text>
          <div>
            <Text h4>Categorías</Text>
            <Grid.Container gap={0.5}>
              {categorias.map((categoria) => (
                <Grid
                  xs={3}
                  md={1}
                  key={categoria.id}
                  css={{ flexDirection: "column" }}
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
                        width: "100%",
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
          </div>
          <div>
            <Text h4 css={{ marginTop: "16px" }}>
              Marcas
            </Text>
            <Grid.Container gap={0.5}>
              {marcas.map((marca) => (
                <Grid
                  xs={3}
                  md={1}
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
                      marcasSelected.filter((m) => m === marca.id).length == 0
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
                          marcasSelected.filter((c) => c === marca.id).length >
                          0
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
          </div>
          <div>
            <Text h4 css={{ marginTop: "16px" }}>
              Tipo de combustible
            </Text>
            <Radio.Group
              orientation="horizontal"
              onChange={setCombustibleSelected}
              value={combustibleSelected}
            >
              <Radio value="diesel">Diesel</Radio>
              <Radio value="gasolina">Bencina</Radio>
            </Radio.Group>
          </div>
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Container fluid>
          <Button
            css={{ width: "100%" }}
            disabled={
              categorySelected.length == 0 && marcasSelected.length == 0
                ? true
                : false
            }
          >
            Aplicar filtros
          </Button>
        </Container>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalFilters;
