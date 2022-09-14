import React, {
  useState,
  useMemo,
  FC,
  useEffect,
  Dispatch,
  SetStateAction,
} from "react";
import { Card, Dropdown, Grid, Row } from "@nextui-org/react";
import { Version } from "../../interfaces";

interface Props {
  setFilter: (arg: any) => void;
  filters: string[];
}

const Filters: FC<Props> = ({ setFilter, filters }) => {
  const [filtersCategory, setFiltersCategory] = useState("");
  const [filtersBrand, setFiltersBrand] = useState("");
  const [filterTransmission, setFilterTransmission] = useState("");
  const [sort, setSort] = useState("asc");

  const filtrosCategory = [
    { key: "todos-carClass", name: "Todos" },
    { key: "Citycar", name: "Citicar" },
    { key: "Hatchback", name: "Hatchback" },
    { key: "Sedán", name: "Sedán" },
    { key: "SUV", name: "SUV" },
    { key: "Van", name: "VAN" },
    { key: "Camioneta", name: "Camioneta" },
    { key: "Comercial", name: "Comercial" },
    { key: "Eléctrico", name: "Híbrido y Eléctrico" },
  ];

  const filtrosBrand = [
    { key: "todos-brand", name: "Todos" },
    { key: "Changan", name: "Changan" },
    { key: "GreatWall", name: "Great Wall" },
    { key: "Haval", name: "Haval" },
    { key: "Jac", name: "JAC" },
    { key: "Mazda", name: "Mazda" },
    { key: "Renault", name: "Renault" },
    { key: "Suzuki", name: "Suzuki" },
  ];
  const filtrosTransmision = [
    { key: "todos-transmision", name: "Todos" },
    { key: "automatica", name: "Automatica" },
    { key: "manual", name: "Manual" },
  ];

  useMemo(() => {
    console.log("component", filters);
    let auxFilters = filters;
    if (sort === "asc") {
      auxFilters =
        filters.length > 0
          ? filters.map((f: string) => {
              if (f === "asc") return "dsc";
              else return f;
            })
          : ["dsc"];
    } else {
      auxFilters =
        filters.length > 0
          ? filters.map((f: string) => {
              if (f === "dsc") return "asc";
              else return f;
            })
          : ["asc"];
    }

    if (filtersCategory != "") {
      if (auxFilters.length === 0) {
        auxFilters = [filtersCategory];
      } else {
        let aux: string[] = [];

        auxFilters.forEach((filtro) => {
          if (!filtrosCategory.find((fc) => fc.key === filtro)) {
            aux.push(filtro);
          }
        });
        aux.push(filtersCategory);

        auxFilters = aux;
      }
    }
    if (filtersBrand != "") {
      if (auxFilters.length === 0) {
        auxFilters = [filtersBrand];
      } else {
        let aux: string[] = [];

        auxFilters.forEach((filtro) => {
          if (!filtrosBrand.find((fc) => fc.key === filtro)) {
            aux.push(filtro);
          }
        });
        aux.push(filtersBrand);

        auxFilters = aux;
      }
    }
    if (filterTransmission != "") {
      if (auxFilters.length === 0) {
        auxFilters = [filterTransmission];
      } else {
        let aux: string[] = [];

        auxFilters.forEach((filtro) => {
          if (!filtrosBrand.find((fc) => fc.key === filtro)) {
            aux.push(filtro);
          }
        });
        aux.push(filterTransmission);

        auxFilters = aux;
      }
    }

    setFilter(auxFilters);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sort, filtersCategory, filtersBrand, filterTransmission]);

  return (
    <Card>
      <Card.Body>
        <Grid.Container>
          <Grid xs={12} sm={6}>
            <Row justify={"flex-start"} css={{ gap: "10px" }}>
              <Dropdown>
                <Dropdown.Button flat css={{ textTransform: "capitalize" }}>
                  {filtersCategory != "todos-carClass" && filtersCategory
                    ? filtersCategory
                    : "Categoria"}
                </Dropdown.Button>
                <Dropdown.Menu
                  aria-label="Categories Actions"
                  selectionMode="single"
                  selectedKeys={[filtersCategory]}
                  onAction={(actionKey: any) => setFiltersCategory(actionKey)}
                  items={filtrosCategory}
                >
                  {filtrosCategory.map((filtro) => (
                    <Dropdown.Item key={filtro.key}>
                      {filtro.name}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
              <Dropdown>
                <Dropdown.Button flat css={{ textTransform: "capitalize" }}>
                  {filtersBrand != "todos-brand" && filtersBrand
                    ? filtersBrand
                    : "Marca"}
                </Dropdown.Button>
                <Dropdown.Menu
                  aria-label="Brands Actions"
                  selectionMode="single"
                  selectedKeys={[filtersBrand]}
                  onAction={(actionKey: any) => setFiltersBrand(actionKey)}
                  items={filtrosBrand}
                >
                  {filtrosBrand.map((filtro) => (
                    <Dropdown.Item key={filtro.key}>
                      {filtro.name}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
              <Dropdown>
                <Dropdown.Button flat css={{ textTransform: "capitalize" }}>
                  {filterTransmission != "todos-transmision" &&
                  filterTransmission
                    ? filterTransmission
                    : "Transmision"}
                </Dropdown.Button>
                <Dropdown.Menu
                  aria-label="Transmision Actions"
                  selectedKeys={[filterTransmission]}
                  selectionMode="single"
                  onAction={(actionKey: any) =>
                    setFilterTransmission(actionKey)
                  }
                  items={filtrosTransmision}
                >
                  {filtrosTransmision.map((filtro) => (
                    <Dropdown.Item key={filtro.key}>
                      {filtro.name}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </Row>
          </Grid>
          <Grid
            xs={12}
            sm={6}
            justify={"flex-end"}
            css={{
              "@xsMax": { justifyContent: "flex-start", marginTop: "20px" },
            }}
          >
            <Dropdown>
              <Dropdown.Button flat>
                {sort === "asc" ? "Ordenar por mayor" : "Ordenar por menor"}
              </Dropdown.Button>
              <Dropdown.Menu
                aria-label="Ordenar Actions"
                selectionMode="single"
                selectedKeys={[sort]}
                onAction={(actionKey: any) => {
                  setSort(actionKey);
                }}
              >
                <Dropdown.Item key="dsc">Ordenar por menor</Dropdown.Item>
                <Dropdown.Item key="asc">Ordenar por mayor</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Grid>
        </Grid.Container>
      </Card.Body>
    </Card>
  );
};

export default Filters;
