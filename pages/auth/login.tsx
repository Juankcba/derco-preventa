import { useState, useEffect, useContext } from "react";
import NextLink from "next/link";

import { useForm } from "react-hook-form";

import { validations } from "../../utils";
import { useRouter } from "next/router";
import { AuthContext } from "../../context/auth/AuthContext";
import {
  Badge,
  Container,
  Grid,
  Input,
  Text,
  Spacer,
  Button,
  Card,
  Link,
  Divider,
} from "@nextui-org/react";

import { signIn, getSession, getProviders } from "next-auth/react";
import { GetServerSideProps } from "next";
import { AuthLayout } from "../../components/Layouts";

type FormData = {
  email: string;
  password: string;
};

const LoginPage = () => {
  const router = useRouter();
  const { loginUser } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const [showError, setShowError] = useState(false);
  const [providers, setProviders] = useState<any>({});

  useEffect(() => {
    getProviders().then((prov) => {
      // console.log({prov});
      setProviders(prov);
    });
  }, []);

  const onLoginUser = async ({ email, password }: FormData) => {
    setShowError(false);

    // const isValidLogin = await loginUser( email, password );
    // if ( !isValidLogin ) {
    //     setShowError(true);
    //     setTimeout(() => setShowError(false), 3000);
    //     return;
    // }
    // // Todo: navegar a la pantalla que el usuario estaba
    // const destination = router.query.p?.toString() || '/';
    // router.replace(destination);
    await signIn("credentials", { email, password });
  };

  return (
    <AuthLayout title={"Ingresar"}>
      <form
        onSubmit={handleSubmit(onLoginUser)}
        noValidate
        autoComplete="false"
      >
        <Grid.Container css={{ width: 350, padding: "10px 20px" }}>
          <Grid css={{ spacing: "2" }}>
            <Text h1>Iniciar Sesión</Text>
            <Badge css={{ display: showError ? "flex" : "none" }}>
              No reconocemos ese usuario / contraseña
            </Badge>
          </Grid>

          <Grid xs={12} justify="center">
            <Input
              fullWidth
              type="email"
              label="Correo"
              shadow={false}
              color="primary"
              status="primary"
              defaultValue={""}
              clearable
              autoComplete="off"
              helperColor={"error"}
              helperText={errors.email?.message}
              {...register("email", {
                required: "Este campo es requerido",
                validate: validations.isEmail,
              })}
            />
          </Grid>
          <Spacer y={1.6} />
          <Grid xs={12} justify={"center"}>
            <Input.Password
              color="primary"
              status="primary"
              fullWidth
              label="Contraseña"
              shadow={false}
              autoComplete="off"
              helperColor={"error"}
              helperText={errors.password?.message}
              {...register("password", {
                required: "Este campo es requerido",
                minLength: { value: 6, message: "Mínimo 6 caracteres" },
              })}
            />
          </Grid>
          <Spacer y={1.6} />

          <Grid xs={12} justify={"center"}>
            <Button type="submit" color="secondary" className="circular-btn">
              Ingresar
            </Button>
          </Grid>
          <Spacer y={0.6} />
          <Grid xs={12} justify="center">
            <NextLink
              href={
                router.query.p
                  ? `/auth/register?p=${router.query.p}`
                  : router.query.callbackUrl
                  ? `/auth/register?p=${router.query.callbackUrl}`
                  : "/auth/register"
              }
              passHref
            >
              <Link underline="true" css={{ marginBottom: "10px" }}>
                ¿No tienes cuenta?
              </Link>
            </NextLink>
          </Grid>
          <Spacer y={1.6} />
          <Grid xs={12} css={{ flexDirection: "column" }} justify="flex-end">
            <Divider css={{ width: "100%", marginBottom: "20px" }} />
            {Object.values(providers).map((provider: any) => {
              if (provider.id === "credentials")
                return <div key="credentials"></div>;

              return (
                <Button
                  key={provider.id}
                  color="primary"
                  css={{ marginBottom: "15px" }}
                  onClick={() => signIn(provider.id)}
                >
                  {provider.name}
                </Button>
              );
            })}
          </Grid>
        </Grid.Container>
      </form>
    </AuthLayout>
  );
};

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

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

export default LoginPage;
