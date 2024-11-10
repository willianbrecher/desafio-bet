import { IBetCreateForm } from "./betsCreate.types";
import * as yup from "yup";

export const getBetCreateSchema = () => {
  return yup.object().shape<IBetCreateForm>({
    amount: yup
      .number()
      .required("O valor é obrigatório!")
      .positive("O valor deve ser positivo!"),
  });
};
