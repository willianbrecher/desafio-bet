import { useMemo, useRef } from "react";
import { AuthApi } from "../../../api/AuthApi";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { getRegisterSchema } from "../utils/register.schema";
import { IRegisterForm } from "../utils/register.types";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";

const useRegister = () => {
  const authApi = useMemo(() => new AuthApi(), []);
  const toast = useRef(null);
  const navigate = useNavigate();

  const formControl = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    resolver: yupResolver(getRegisterSchema()),
  });

  const handleSubmit = formControl.handleSubmit((form) => {
    submitRegisterMutation.mutate(form);
  });

  const submitRegisterMutation = useMutation({
    mutationFn: async (form: IRegisterForm) => {
      return await authApi.register<IRegisterForm>(form);
    },
    onSuccess: () => handleSuccess(),
    onError: (error) => handleError(error),
  });

  const handleClose = () => {
    navigate("/");
  };

  const handleSuccess = () => {
    toast.current.show({
      severity: "success",
      summary: "Registro",
      detail: "Usuário registrado com sucesso!",
      life: 10000,
    });
    formControl.reset();
  };

  const handleError = (error) => {
    toast.current.show({
      severity: "error",
      summary: "Registro",
      detail:
        "Ocorreu um erro ao registrar o usuário! " +
        error.response.data.message,
      life: 10000,
    });
    console.info(error);
  };

  return {
    form: {
      formControl: formControl,
      submit: handleSubmit,
      close: handleClose,
    },
    toast,
  };
};

export default useRegister;
