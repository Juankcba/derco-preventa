import { FormControl, Select, TextField } from "@mui/material";
import { Text, Grid } from "@nextui-org/react";
import React, { useState, useEffect } from "react";

const FormPlate = ({ data, formik, regions }) => {
  const [ces, setCes] = useState("");
  const [consecionario, setConsecionario] = useState(regions || []);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (ces != "") {
      setError(false);
      formik.setFieldValue("regions", ces);
      setData({ ...data, ces: ces });
    }
  }, [ces]);

  return (
    <div>
      <Text className="text-form-solict">
        Te solicitamos los últimos datos, para que todo este listo en tu
        mantencion de los{" "}
        {new Intl.NumberFormat("es-CL").format(
          parseInt(data.model.model_slug, 10)
        )}{" "}
        kms.
      </Text>
      <Grid.Container gap={1} css={{ p: 0, maxWidth: "99%" }}>
        <Grid xs={12}>
          <TextField
            fullWidth
            required
            id="preventa-mantenciones-plate"
            name="plate"
            label="Ingresa tu Patente"
            onChange={formik.handleChange}
            value={formik.values.plate}
            helperColor={"error"}
            helperText={
              formik.errors.plate && formik.touched.plate
                ? formik.errors.plate
                : ""
            }
          />
        </Grid>
        <Grid xs={12}>
          <TextField
            fullWidth
            required
            id="preventa-mantenciones-kms"
            name="kms"
            label="Kilometraje actual"
            onChange={formik.handleChange}
            value={formik.values.kms}
            helperColor={"error"}
            helperText={
              formik.errors.kms && formik.touched.kms ? formik.errors.kms : ""
            }
          />
        </Grid>
        <Grid xs={12}>
          <FormControl fullWidth>
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
            {error && <Text color="error">Seleccione un concesionario</Text>}
          </FormControl>
        </Grid>
      </Grid.Container>
    </div>
  );
};

export default FormPlate;
