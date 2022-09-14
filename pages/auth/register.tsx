import { useState, useContext } from "react";
import { useRouter } from "next/router";
import NextLink from "next/link";
import { useForm } from "react-hook-form";
import { GetServerSideProps } from "next";
import { signIn, getSession } from "next-auth/react";
import { AuthContext } from "../../context";

import { validations } from "../../utils";
import { Container, Grid, Input, Spacer, Text } from "@nextui-org/react";
import { Badge } from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import { Link } from "@nextui-org/react";
import { AuthLayout } from "../../components/Layouts";

type FormData = {
  name: string;
  email: string;
  password: string;
};

const RegisterPage = () => {
  const router = useRouter();
  const { registerUser } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const onRegisterForm = async ({ name, email, password }: FormData) => {
    setShowError(false);
    const { hasError, message } = await registerUser(name, email, password);

    if (hasError) {
      setShowError(true);
      setErrorMessage(message!);
      setTimeout(() => setShowError(false), 3000);
      return;
    }

    // Todo: navegar a la pantalla que el usuario estaba
    // const destination = router.query.p?.toString() || '/';
    // router.replace(destination);

    await signIn("credentials", { email, password });
  };

  return (
    <AuthLayout title={"Ingresar | DercoCenter"}>
      <form onSubmit={handleSubmit(onRegisterForm)} noValidate>
        <Grid.Container css={{ width: 350, padding: "10px 20px" }}>
          <Grid css={{ spacing: "2" }}>
            <Grid xs={12}>
              <Text h1>Crear cuenta</Text>
              <Badge css={{ display: showError ? "flex" : "none" }}>
                No reconocemos ese usuario / contraseña
              </Badge>
            </Grid>

            <Grid xs={12}>
              <Input
                label="Nombre completo"
                fullWidth
                {...register("name", {
                  required: "Este campo es requerido",
                  minLength: { value: 2, message: "Mínimo 2 caracteres" },
                })}
                helperColor={"error"}
                helperText={errors.name?.message}
              />
            </Grid>
            <Spacer y={1.6} />
            <Grid xs={12}>
              <Input
                type="email"
                label="Correo"
                fullWidth
                {...register("email", {
                  required: "Este campo es requerido",
                  validate: validations.isEmail,
                })}
                helperColor="error"
                helperText={errors.email?.message}
              />
            </Grid>

            <Spacer y={1.6} />
            <Grid xs={12}>
              <Input.Password
                label="Contraseña"
                type="password"
                fullWidth
                {...register("password", {
                  required: "Este campo es requerido",
                  minLength: { value: 6, message: "Mínimo 6 caracteres" },
                })}
                helperColor={"error"}
                helperText={errors.password?.message}
              />
            </Grid>

            <Spacer y={1.6} />
            <Grid xs={12}>
              <Button type="submit" color="secondary" className="circular-btn">
                Ingresar
              </Button>
            </Grid>

            <Grid xs={12} justify="flex-end">
              <NextLink
                href={
                  router.query.p
                    ? `/auth/login?p=${router.query.p}`
                    : router.query.callbackUrl
                    ? `/auth/login?p=${router.query.callbackUrl}`
                    : "/auth/login"
                }
                passHref
              >
                <Link underline>¿Ya tienes cuenta?</Link>
              </NextLink>
            </Grid>
          </Grid>
        </Grid.Container>
      </form>
    </AuthLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  req,
  query,
}) => {
  const session = await getSession({ req });
  // console.log({session});

  const { p = "/" } = query;
  if (query.callbackUrl && session) {
    return {
      redirect: {
        destination: query.callbackUrl.toString(),
        permanent: false,
      },
    };
  }

  if (session) {
    return {
      redirect: {
        destination: p.toString(),
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

export default RegisterPage;
