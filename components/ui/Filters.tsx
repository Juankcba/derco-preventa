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
  const [filtersCategory, setFiltersCategory] = useState(new Set([]));

  const [filtersBrand, setFiltersBrand] = useState(new Set([]));

  const [sort, setSort] = useState(new Set(["asc"]));

  const selectedValue = useMemo(
    () => Array.from(sort).join(", ").replaceAll("_", " "),

    [sort]
  );

  const selectedBrandValue = useMemo(
    () => Array.from(filtersBrand).join(", ").replaceAll("_", " "),
    [filtersBrand]
  );

  const selectedCategoryValue = useMemo(
    () => Array.from(filtersCategory).join(", ").replaceAll("_", " "),
    [filtersCategory]
  );

  useMemo(() => {
    const sortValue = Array.from(sort).join(", ").replaceAll("_", " ");
    console.log("component", filters);
    if (sortValue === "asc") {
      setFilter(
        filters.length > 0
          ? filters.map((f: string) => {
              if (f === "asc") return "dsc";
              else return f;
            })
          : ["dsc"]
      );
    } else {
      setFilter(
        filters.length > 0
          ? filters.map((f: string) => {
              if (f === "dsc") return "asc";
              else return f;
            })
          : ["asc"]
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sort]);

  return (
    <Card>
      <Card.Body>
        <Grid.Container>
          <Grid xs={12} sm={6}>
            <Row justify={"flex-start"} css={{ gap: "10px" }}>
              <Dropdown>
                <Dropdown.Button flat css={{ textTransform: "capitalize" }}>
                  {selectedCategoryValue ? selectedCategoryValue : "Categoria"}
                </Dropdown.Button>
                <Dropdown.Menu
                  aria-label="Categories Actions"
                  selectionMode="single"
                  selectedKeys={filtersCategory}
                  onSelectionChange={setFiltersCategory}
                >
                  <Dropdown.Item key="citicar">Citicar</Dropdown.Item>
                  <Dropdown.Item key="hatchback">Hatchback</Dropdown.Item>
                  <Dropdown.Item key="sedan">Sedán</Dropdown.Item>
                  <Dropdown.Item key="suv">SUV</Dropdown.Item>
                  <Dropdown.Item key="van">Van</Dropdown.Item>
                  <Dropdown.Item key="deportivo">Deportivo</Dropdown.Item>
                  <Dropdown.Item key="camioneta">Camioneta</Dropdown.Item>
                  <Dropdown.Item key="comercial">Comercial</Dropdown.Item>
                  <Dropdown.Item key="hibrido">
                    Híbrido y Eléctrico
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              <Dropdown>
                <Dropdown.Button flat css={{ textTransform: "capitalize" }}>
                  {selectedBrandValue ? selectedBrandValue : "Marca"}
                </Dropdown.Button>
                <Dropdown.Menu
                  aria-label="Brands Actions"
                  selectionMode="single"
                  selectedKeys={filtersBrand}
                  onSelectionChange={setFiltersBrand}
                >
                  <Dropdown.Item key="suzuki">Suzuki</Dropdown.Item>
                  <Dropdown.Item key="mazda">Mazda</Dropdown.Item>
                  <Dropdown.Item key="renault">Renault</Dropdown.Item>
                  <Dropdown.Item key="haval">Haval</Dropdown.Item>
                  <Dropdown.Item key="greatWall">GreatWall</Dropdown.Item>
                  <Dropdown.Item key="changan">Changan</Dropdown.Item>
                  <Dropdown.Item key="jac">JAC</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              <Dropdown>
                <Dropdown.Button flat>Modelo</Dropdown.Button>
                <Dropdown.Menu aria-label="Static Actions">
                  <Dropdown.Item key="new">New file</Dropdown.Item>
                  <Dropdown.Item key="copy">Copy link</Dropdown.Item>
                  <Dropdown.Item key="edit">Edit file</Dropdown.Item>
                  <Dropdown.Item key="delete" color="error">
                    Delete file
                  </Dropdown.Item>
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
                {selectedValue === "asc"
                  ? "Ordenar por mayor"
                  : "Ordenar por menor"}
              </Dropdown.Button>
              <Dropdown.Menu
                aria-label="Ordenar Actions"
                selectionMode="single"
                selectedKeys={sort}
                onSelectionChange={setSort}
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
