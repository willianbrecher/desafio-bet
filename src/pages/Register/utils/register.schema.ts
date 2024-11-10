import * as yup from "yup";
import { IRegisterForm } from "./register.types";

export const getRegisterSchema = () => {
  return yup.object().shape<IRegisterForm>({
    name: yup.string().required("O nome é obrigatório!"),
    email: yup.string().email("O email é inválido!"),
    password: yup.string().required("A senha é obrigatória!"),
    confirmPassword: yup
      .string()
      .required("A confirmação da senha é obrigatória!")
      .oneOf([yup.ref("password")], "Senhas não conferem."),
  });
};
