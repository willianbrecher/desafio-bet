import * as yup from "yup";
import { ILoginForm } from "./login.types";

export const getLoginSchema = () => {
  return yup.object().shape<ILoginForm>({
    email: yup.string().email("O email é inválido!"),
    password: yup.string().required("A senha é obrigatória!")
  });
};
