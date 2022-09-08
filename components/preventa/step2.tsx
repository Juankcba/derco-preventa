import React, { FC } from "react";
import {
  Grid,
  Text,
  Row,
  Card,
  Input,
  Spacer,
  Button,
} from "@nextui-org/react";
import { validations } from "../../utils";
import CarsColorsPreventa from "../cars/CarsColorsPreventa";
import { ModelResponse, IPUser } from "../../interfaces";
import { currency } from "../../utils";
import { useForm } from "react-hook-form";
interface Props {
  model: ModelResponse;
  setStep: (arg: number) => void;
  user: IPUser;
  setUser: (arg: IPUser) => void;
}
type FormData = {
  name: string;
  email: string;
  rut: string;
  lastname: string;
  phone: string;
};
const PreventaStep2: FC<Props> = ({ model, setStep, user, setUser }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ defaultValues: user });

  const handleStep = (data: FormData) => {
    setUser(data);
    setStep(3);
  };
  return (
    <Card css={{ w: "100%", h: "100%" }}>
      <Card.Body css={{ overflowY: "hidden" }}>
        <Text h1>Ahora necesitamos tus datos</Text>
        <Text h4>El {model.name} te espera</Text>
        <Spacer y={1.2} />
        <form
          onSubmit={handleSubmit(handleStep)}
          noValidate
          autoComplete="false"
        >
          <Grid.Container gap={4} css={{ w: "100%", h: "100%" }}>
            <Grid>
              <Input
                bordered
                labelPlaceholder="RUT"
                color="default"
                helperColor={"error"}
                initialValue={user.rut}
                helperText={errors.rut?.message}
                {...register("rut", {
                  required: "Este campo es requerido",
                  minLength: { value: 8, message: "Mínimo 8 caracteres" },
                })}
              />
            </Grid>
            <Grid>
              <Input
                bordered
                labelPlaceholder="NOMBRE"
                color="default"
                helperColor={"error"}
                initialValue={user.name}
                helperText={errors.name?.message}
                {...register("name", {
                  required: "Este campo es requerido",
                  minLength: { value: 2, message: "Mínimo 2 caracteres" },
                })}
              />
            </Grid>
            <Grid>
              <Input
                bordered
                labelPlaceholder="APELLIDO"
                color="default"
                helperColor={"error"}
                initialValue={user.lastname}
                helperText={errors.lastname?.message}
                {...register("lastname", {
                  required: "Este campo es requerido",
                  minLength: { value: 2, message: "Mínimo 2 caracteres" },
                })}
              />
            </Grid>
            <Grid>
              <Input
                bordered
                labelPlaceholder="TELÉFONO"
                color="default"
                helperColor={"error"}
                initialValue={user.phone}
                helperText={errors.phone?.message}
                {...register("phone", {
                  required: "Este campo es requerido",
                  minLength: { value: 2, message: "Mínimo 2 caracteres" },
                })}
              />
            </Grid>
            <Grid>
              <Input
                bordered
                labelPlaceholder="EMAIL"
                color="default"
                helperColor={"error"}
                initialValue={user.email}
                helperText={errors.email?.message}
                {...register("email", {
                  required: "Este campo es requerido",
                  validate: validations.isEmail,
                })}
              />
            </Grid>

            <Grid xs={8}>
              <Button type="submit" disabled={Object.keys(errors).length > 0}>
                Continuar
              </Button>
            </Grid>
          </Grid.Container>
        </form>
      </Card.Body>
    </Card>
  );
};

export default PreventaStep2;
