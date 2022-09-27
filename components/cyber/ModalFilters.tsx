/* eslint-disable react/jsx-no-target-blank */
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
  Checkbox,
  Radio,
} from "@nextui-org/react";
import React, { FC, useContext, useState, useEffect } from "react";
import { UiContext, FilterContext } from "../../context";
import { categorias, marcas } from "../../database/constants";
import { Box } from "../ui/Box";
import { FilterIcon } from "../ui/FilterIcon";
import FiltersOnBottom from "./../ui/FiltersOnBottom";
import CloseIcon from "@mui/icons-material/Close";
import { useRouter } from "next/router";

interface CateorySelected {
  id: Number[];
}

const ModalFilters: FC = () => {
  const router = useRouter();
  const { isModalOpen, setVisible } = useContext(UiContext);
  const {
    filterCarClass,
    isMantenciones,
    filterCombustible,
    filterBrand,
    filterMantenciones,
    filterMantencionesCarClass,
    resultadosVersiones,
    resultadosMantenciones,
    setIndex,
    setIndexMant,
    setFilterBrand,
    setFilterCombustible,
    setFilterCarClass,
    setFilterMantenciones,
    setScrollChange,
  } = useContext(FilterContext);
  const [categorySelected, setCategorySelected] = useState(
    filterCarClass as string[]
  );
  const [categoryMantencionesSelected, setCategoryMatencionesSelected] =
    useState(filterMantencionesCarClass as string[]);
  const [marcasSelected, setMarcasSelected] = useState(filterBrand as string[]);
  const [mantencionesSelected, setMantencionesSelected] = useState(
    filterMantenciones as string[]
  );
  const [combustibleSelected, setCombustibleSelected] = useState(
    filterCombustible as string[]
  );
  const [modalMobile, setModalMobile] = useState(true as boolean);

  useEffect(() => {
    if (window?.screen?.availWidth <= 1281) {
      setModalMobile(true);
    } else {
      setModalMobile(false);
    }
  }, []);

  const closeHandler = () => {
    if (resultadosVersiones.length > 0) {
      setVisible(false);
      setScrollChange(true);
      router.push({
        pathname: "/",
        query: {
          card: isMantenciones,
          mantenciones: mantencionesSelected,
          brands: marcasSelected,
          categories: categorySelected,
          combustible: combustibleSelected,
          categoriesMantenciones: categoryMantencionesSelected,
        },
      });
    }
  };

  const handleFilterCategoryMantenciones = (name: string) => {
    let aux = [];
    if (categoryMantencionesSelected.includes(name)) {
      aux = categoryMantencionesSelected.filter((c) => c != name);
    } else {
      if (categoryMantencionesSelected.length > 0) {
        aux = [...categoryMantencionesSelected, name];
      } else {
        aux.push(name);
      }
    }

    router.replace({
      pathname: "/",
      query: {
        card: isMantenciones,
        brands: marcasSelected,
        categories: categorySelected,
        categoriesMantenciones: aux,
        mantenciones: mantencionesSelected,
        combustible: combustibleSelected,
      },
    });
    setCategoryMatencionesSelected(aux);
  };

  const handleFilterCategory = (name: string) => {
    let aux = [];
    if (categorySelected.includes(name)) {
      aux = categorySelected.filter((c) => c != name);
    } else {
      if (categorySelected.length > 0) {
        aux = [...categorySelected, name];
      } else {
        aux.push(name);
      }
    }

    router.replace({
      pathname: "/",
      query: {
        card: isMantenciones,
        brands: marcasSelected,
        categories: aux,
        mantenciones: mantencionesSelected,
        combustible: combustibleSelected,
        categoriesMantenciones: categoryMantencionesSelected,
      },
    });
    setCategorySelected(aux);
    //setFilterCarClass(aux);
  };
  const handleFilterBrand = (name: string) => {
    let aux = [];
    if (marcasSelected.includes(name)) {
      aux = marcasSelected.filter((c) => c != name);
    } else {
      if (marcasSelected.length > 0) {
        aux = [...marcasSelected, name];
      } else {
        aux.push(name);
      }
    }

    router.replace({
      pathname: "/",
      query: {
        brands: aux,
        categories: categorySelected,
        card: isMantenciones,
        mantenciones: mantencionesSelected,
        combustible: combustibleSelected,
        categoriesMantenciones: categoryMantencionesSelected,
      },
    });
    setMarcasSelected(aux);
    //setFilterBrand(aux);
  };
  const handleCombustible = (state: any) => {
    console.log("state", state);
    router.replace({
      pathname: "/",
      query: {
        card: isMantenciones,
        brands: marcasSelected,
        categories: categorySelected,
        mantenciones: mantencionesSelected,
        categoriesMantenciones: categoryMantencionesSelected,
        combustible: state,
      },
    });
    setCombustibleSelected(state);
    //setFilterCombustible(true);
  };

  const handleMantenciones = (state: string[]) => {
    router.replace({
      pathname: "/",
      query: {
        card: isMantenciones,
        brands: marcasSelected,
        categories: categorySelected,
        combustible: combustibleSelected,
        categoriesMantenciones: categoryMantencionesSelected,
        mantenciones: state,
      },
    });
    setMantencionesSelected(state);
  };

  const handleFilters = () => {
    setIndexMant(1);
    setIndex(1);
    closeHandler();
  };

  console.log(resultadosVersiones);

  return (
    <Container
      justify="flex-start"
      css={{ padding: "10px 1px 20px", flexDirection: "column" }}
    >
      <div
        style={{
          width: "100%",
          paddingRight: "20px",
          display: "flex",
          justifyContent: "flex-end",
          cursor: "pointer",
        }}
      >
        <CloseIcon onClick={closeHandler} />
      </div>

      <Grid.Container
        css={{
          padding: "20px 40px 40px",
          "@mdMax": { padding: "12px 24px 24px" },
        }}
      >
        <Grid xs={12} css={{ flexDirection: "column" }}>
          <Text h1 className="title-modal-filter">
            Filtros
          </Text>
          <Text className="subtitle-modal-filter">
            Puedes seleccionar mas de una opción de filtro.{" "}
            {isMantenciones && (
              <a
                href="https://s3.amazonaws.com/dercocenter.cl/cyber/legals/pregunta-frecuentes-promocion-cyber-dercocenter-220926.pdf"
                target="_blank"
                className="matencion-link"
              >
                ¿Como elegir mi matención?
              </a>
            )}
          </Text>
        </Grid>
        <Grid
          xs={12}
          md={isMantenciones ? 6 : 4}
          css={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            marginTop: "16px",
          }}
        >
          <Text h4>{isMantenciones ? "¿Qué auto tienes?" : "Categorías"}</Text>
          <Grid.Container
            gap={0.5}
            css={{
              maxWidth: isMantenciones ? "510px" : "390px",
              marginTop: "16px",
            }}
          >
            {isMantenciones
              ? categorias.slice(0, 5).map((categoria) => (
                  <Grid
                    xs
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
                      onClick={() =>
                        handleFilterCategoryMantenciones(categoria.name)
                      }
                      disableOutline
                      content="X"
                      size="xs"
                      css={{ p: "0", color: "white", bgColor: "black" }}
                      horizontalOffset="0%"
                      verticalOffset="2%"
                      isInvisible={
                        categoryMantencionesSelected.filter(
                          (c) => c === categoria.name
                        ).length == 0
                          ? true
                          : false
                      }
                    >
                      <Card
                        variant="flat"
                        isPressable
                        className="filter-card-category"
                        onClick={() =>
                          handleFilterCategoryMantenciones(categoria.name)
                        }
                        css={{
                          width: "72px",
                          height: "72px",
                          margin: "0 auto",
                          border:
                            categoryMantencionesSelected.filter(
                              (c) => c === categoria.name
                            ).length > 0
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
                ))
              : categorias.slice(0, 4).map((categoria) => (
                  <Grid
                    xs
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
                      onClick={() => handleFilterCategory(categoria.name)}
                      disableOutline
                      content="X"
                      size="xs"
                      css={{ p: "0", color: "white", bgColor: "black" }}
                      horizontalOffset="0%"
                      verticalOffset="2%"
                      isInvisible={
                        categorySelected.filter((c) => c === categoria.name)
                          .length == 0
                          ? true
                          : false
                      }
                    >
                      <Card
                        variant="flat"
                        isPressable
                        className="filter-card-category"
                        onClick={() => handleFilterCategory(categoria.name)}
                        css={{
                          width: "72px",
                          height: "72px",
                          margin: "0 auto",
                          border:
                            categorySelected.filter((c) => c === categoria.name)
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
            md={6}
            css={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              marginTop: "16px",
            }}
          >
            <Text h4 css={{ "@mdMax": { marginTop: "16px" } }}>
              ¿Que mantención te corresponde?
            </Text>
            <Checkbox.Group
              orientation={!modalMobile ? "horizontal" : "vertical"}
              onChange={handleMantenciones}
              defaultValue={mantencionesSelected}
            >
              <Checkbox value="10mil">10mil Km</Checkbox>
              <Checkbox value="20mil">20mil Km</Checkbox>
              <Checkbox value="30mil">30mil Km</Checkbox>
            </Checkbox.Group>
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
              marginTop: "16px",
            }}
          >
            <Text h4 css={{ "@mdMax": { marginTop: "16px" } }}>
              Marcas
            </Text>
            <Grid.Container
              gap={0.5}
              css={{ maxWidth: "390px", marginTop: "16px" }}
            >
              {marcas.map((marca) => (
                <Grid
                  xs={3}
                  key={marca.id}
                  css={{ flexDirection: "column" }}
                  justify="center"
                >
                  <Badge
                    onClick={() => handleFilterBrand(marca.name)}
                    content="X"
                    css={{ p: "0", color: "white", bgColor: "black" }}
                    placement="top-right"
                    horizontalOffset="4%"
                    verticalOffset="2%"
                    shape="circle"
                    size="md"
                    isInvisible={
                      marcasSelected.filter((m) => m === marca.name).length == 0
                        ? true
                        : false
                    }
                  >
                    <Avatar
                      onClick={() => handleFilterBrand(marca.name)}
                      className="filter-avatar"
                      size="xl"
                      css={{
                        margin: "0 auto",

                        border:
                          marcasSelected.filter((c) => c === marca.name)
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
              marginTop: "16px",
            }}
          >
            <Text
              h4
              css={{ "@mdMax": { marginTop: "16px" }, marginBottom: "16px" }}
            >
              Tipo de combustible
            </Text>
            <Checkbox.Group
              orientation="horizontal"
              onChange={handleCombustible}
              defaultValue={combustibleSelected}
            >
              <Checkbox value="diesel">Diesel</Checkbox>
              <Checkbox value="gasolina">Bencina</Checkbox>
            </Checkbox.Group>
          </Grid>
        )}
      </Grid.Container>

      <Grid.Container
        css={{
          padding: "0px 10px 16px",
        }}
      >
        <Grid
          xs={0}
          md={12}
          css={{
            width: "100%",
            height: "18px",
            borderTop: "2px solid #F6F5F5;",
          }}
        ></Grid>
        <Grid
          xs={0}
          md={9}
          css={{
            width: "100%",

            "@mdMin": { display: "none" },
          }}
        >
          <FiltersOnBottom />
        </Grid>
        <Grid xs={12} md={3} css={{ width: "100%" }}>
          <Button
            auto
            onPress={closeHandler}
            className="btn-primary big"
            css={{ width: "100%" }}
            disabled={resultadosVersiones.length == 0 ? true : false}
          >
            Ver
            {isMantenciones
              ? " ( " + resultadosMantenciones.length + " ) " + "Mantenciones"
              : " ( " + resultadosVersiones.length + " ) " + "Autos"}
          </Button>
        </Grid>
      </Grid.Container>
    </Container>
  );
};

export default ModalFilters;
