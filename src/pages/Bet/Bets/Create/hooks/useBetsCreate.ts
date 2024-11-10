import { useMemo } from "react";
import { BetApi } from "../../../../../api/BetApi";
import {
  IBetCreated,
  IBetCreatedRequest,
} from "../../../../../types/bet.types";
import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { getBetCreateSchema } from "../utils/betsCreate.schema";
import { useAuth } from "../../../../../context/hooks/useAuth";

const useBetsCreate = () => {
  const betApi = useMemo(() => new BetApi(), []);
  const { toast, updateBalance } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const formControl = useForm({
    defaultValues: {
      amount: "",
    },
    resolver: yupResolver(getBetCreateSchema()),
  });

  const handleCreateBet = formControl.handleSubmit((form) => {
    submitCreateMutation.mutate(form);
  });

  const submitCreateMutation = useMutation({
    mutationFn: async (form: IBetCreatedRequest) => {
      return await betApi.create<IBetCreated>(form);
    },
    onSuccess: (response) => handleSuccess(response),
    onError: (error) => handleError(error),
  });

  const handleSuccess = (response) => {
      toast.current.show({
        severity: "success",
        summary: "Aposta",
        detail: "Aposta realizada com sucesso!",
        life: 10000,
      });
    updateBalance(response.data.balance);
    queryClient.invalidateQueries(betApi.ListQueryKey).then();
    handleClose();
  };

  const handleClose = () => {
    formControl.reset();
    navigate("/bets");
  };

  const handleError = (error) => {
      toast.current.show({
        severity: "error",
        summary: "Aposta",
        detail:
          "Ocorreu um erro ao realizar a aposta! " +
          error.response.data.message,
        life: 10000,
      });
  };

  return {
    form: {
      formControl: formControl,
      submit: handleCreateBet,
      close: handleClose,
    },
    toast,
  };
};

export default useBetsCreate;
