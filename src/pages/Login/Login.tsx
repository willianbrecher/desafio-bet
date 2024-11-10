import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { FC } from "react";
import { Controller } from "react-hook-form";
import useLogin from "./hooks/useLogin";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { useAuth } from "../../context/hooks/useAuth";
import { Navigate } from "react-router-dom";

const Login: FC = () => {
  const { form, toast } = useLogin();
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return (<Navigate to="/bets" />);
  }

  return (
    <Card title="Entrar">
      <Toast ref={toast} />
      <Controller
        name={"email"}
        control={form.formControl.control}
        render={({ field, fieldState }) => {
          return (
            <>
              <InputText
                {...field}
                value={form.formControl.watch("email")}
                placeholder="E-mail"
              />
              {fieldState.error && fieldState.error.message ? (
                <small>{fieldState.error?.message}</small>
              ) : (
                <></>
              )}
            </>
          );
        }}
      />
      <Controller
        name={"password"}
        control={form.formControl.control}
        render={({ field, fieldState }) => {
          return (
            <>
              <InputText
                {...field}
                value={form.formControl.watch("password")}
                placeholder="Senha"
              />
              {fieldState.error && fieldState.error.message ? (
                <small>{fieldState.error?.message}</small>
              ) : (
                <></>
              )}
            </>
          );
        }}
      />
      <Button label="Entrar" onClick={form.submit} />
      <Button label="Cancelar" onClick={form.close} />
    </Card>
  );
};

export default Login;
