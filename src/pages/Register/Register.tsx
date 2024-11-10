import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { FC } from "react";
import { Controller } from "react-hook-form";
import useRegister from "./hooks/useRegister";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { useAuth } from "../../context/hooks/useAuth";
import { Navigate } from "react-router-dom";

const Register: FC = () => {
  const { form, toast } = useRegister();

  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/bets" />;
  }
  return (
    <Card title="Registrar usuário">
      <Toast ref={toast} />
      <Controller
        name={"name"}
        control={form.formControl.control}
        render={({ field, fieldState }) => {
          return (
            <>
              <InputText
                {...field}
                value={form.formControl.watch("name")}
                placeholder="Name"
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
      <Controller
        name={"confirmPassword"}
        control={form.formControl.control}
        render={({ field, fieldState }) => {
          return (
            <>
              <InputText
                {...field}
                value={form.formControl.watch("confirmPassword")}
                placeholder="Confirmar senha"
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
      <Button label="Registrar" onClick={form.submit} />
      <Button label="Cancelar" onClick={form.close} />
    </Card>
  );
};

export default Register;
