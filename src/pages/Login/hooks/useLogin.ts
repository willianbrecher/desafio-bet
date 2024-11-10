import { useMemo, useRef } from "react";
import { AuthApi } from "../../../api/AuthApi";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { getLoginSchema } from "../utils/login.schema";
import { ILoginForm } from "../utils/login.types";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/hooks/useAuth";

const useLogin = () => {
  const authApi = useMemo(() => new AuthApi(), []);
  const toast = useRef(null);
  const navigate = useNavigate();

  const { login } = useAuth();

  const formControl = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(getLoginSchema()),
  });

  const handleSubmit = formControl.handleSubmit((form) => {
    submitLoginMutation.mutate(form);
  });

  const submitLoginMutation = useMutation({
    mutationFn: async (form: ILoginForm) => {
      return await authApi.login<ILoginForm>(form);
    },
    onSuccess: (response) => handleSuccess(response),
    onError: (error) => handleError(error),
  });

  const handleSuccess = (response) => {
    login(response.data);
    navigate("/bets");
  };

  const handleClose = () => {
    navigate("/");
  };

  const handleError = (error) => {
    toast.current.show({
      severity: "error",
      summary: "Login",
      detail: "Ocorreu um erro ao entrar! " + error.response.data.message,
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

export default useLogin;
