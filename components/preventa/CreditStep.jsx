import React, { FC, useState, useEffect } from "react";
import {
  Grid,
  Text,
  Row,
  Card,
  Input,
  Spacer,
  Button,
  Dropdown,
  Loading,
} from "@nextui-org/react";
import { validations } from "../../utils";
import CarsColorsPreventa from "../cars/CarsColorsPreventa";
import { ModelResponse, IPUser } from "../../interfaces";
import { currency } from "../../utils";
import { useForm } from "react-hook-form";
import SelectColor from "./SelectColor";
import FormCredito from "./FormCredito";
import HelperSwipper from "./HelperSwipper";
import CardHeader from "./CardHeader";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import Swal from "sweetalert2";
import {
  FormControl,
  InputLabel,
  MenuItem,
  TextField,
  Box,
  ListSubheader,
} from "@mui/material";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { cesApi, storeApi } from "../../apis";

// interface Props {
//   model: ModelResponse;
//   setStep: (arg: number) => void;
//   user: IPUser;
//   setUser: (arg: IPUser) => void;
//   selectedColor: String;
// }

const PreventaStep3 = ({
  model,
  setStep,
  data,
  setData,
  selectedColor,
  setColor,
  colors,
  loadingColors,
  regions,
}) => {
  const [consecionario, setConsecionario] = useState(regions || []);
  const [error, setError] = useState(false);
  const [validate, setValidate] = useState(false);
  const [ces, setCes] = useState("");

  // const getCesData = async () => {
  //   try {
  //     // await storeApi
  //     //   .get(`/pre-order/${model.model_slug}/subsidiaries`)
  //     //   .then((response) => {
  //     //     console.log("response", response);
  //     //   });
  //     await cesApi
  //       .get(`/pre-order/new-haval-dargo/subsidiaries`)
  //       .then((response) => {
  //         if (response.status == 200) {
  //           setConsecionario(response.data);
  //         }
  //       });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // useEffect(() => {
  //   getCesData();
  // }, []);

  useEffect(() => {
    if (ces != "") {
      setError(false);
    }
  }, [ces]);

  const handleStep = () => {
    if (ces == "") {
      setError(true);
      Swal.fire({
        title: "Error!",
        text: "Seleccione un consecionario",
        icon: "error",
        confirmButtonText: "Confirmar",
      });
    }
    if (validate && ces != "") {
      setData({ ...data, ces: ces });
      setStep(2);
    }
  };

  return (
    <Card
      css={{
        w: "100%",
        h: "100%",
        p: "32px",
        overflow: "hidden",
        maxWidth: "100%",
        "@mdMin": {
          maxWidth: "503px",
        },
      }}
    >
      <Card.Body css={{ p: 0, overflow: "hidden" }}>
        <CardHeader model={model} title={"Por $200.000 reserva tu"} />
        <Card.Divider css={{ margin: "24px 0" }}></Card.Divider>
        {loadingColors ? (
          <Loading />
        ) : (
          <SelectColor setColor={setColor} colors={colors} />
        )}

        {!loadingColors && data.model.stock_availabe != 0 && (
          <>
            <Card.Divider css={{ margin: "24px 0" }}></Card.Divider>
            <Text>Selecciona tu concesionario</Text>
            {consecionario.length === 0 ? (
              <Loading />
            ) : (
              <FormControl sx={{ m: 1, minWidth: 120 }}>
                <Select
                  native
                  defaultValue=""
                  id="grouped-concesionario-select"
                  value={ces}
                  onChange={(e) => setCes(e.target.value)}
                >
                  <option value={""} disabled>
                    Seleccione una opción
                  </option>
                  {consecionario.length > 0 &&
                    consecionario.map((region, index) => (
                      <optgroup label={region.name} key={`region-${index + 1}`}>
                        {region.subsidiaries.map((sub) => (
                          <option value={sub.id} key={sub.id}>
                            {sub.name}
                          </option>
                        ))}
                      </optgroup>
                    ))}
                </Select>
                {error && (
                  <Text color="error">Seleccione un concesionario</Text>
                )}
              </FormControl>
            )}
            <FormCredito
              setValidate={setValidate}
              model={model}
              setData={setData}
              data={data}
            />
            <Card.Divider css={{ margin: "24px 0" }}></Card.Divider>
            <Button
              disabled={!validate}
              onPress={() => handleStep()}
              className="btn-primary big"
              iconRight={<NavigateNextIcon fill="currentColor" />}
            >
              Siguiente
            </Button>
          </>
        )}
        <Card.Divider css={{ margin: "24px 0" }}></Card.Divider>
        <HelperSwipper />
      </Card.Body>
    </Card>
  );
};

export default PreventaStep3;
