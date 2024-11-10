import { useNavigate } from "react-router-dom";
import { BetApi } from "../../../../../api/BetApi";
import { useEffect, useMemo, useState } from "react";
import {
  IBetCanceled,
  IBetPageableList,
  IBetPageableListItem,
  IBetPageableListQuery,
} from "../../../../../types/bet.types";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { AxiosError } from "axios";
import { useAuth } from "../../../../../context/hooks/useAuth";

const useBetsList = () => {
  const betApi = useMemo(() => new BetApi(), []);
  const [betItems, setBetItems] = useState<IBetPageableListItem[]>([]);
  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(5);
  const [totalItems, setTotalItems] = useState<number>(0);
  const { toast, updateBalance } = useAuth();
  const queryClient = useQueryClient();

  const navigate = useNavigate();

  const [filter, setFilter] = useState<IBetPageableListQuery>({
    page: 1,
    limit: 5,
  });

  const handleNextPageItems = (page: any) => {
    setPage(page.page + 1);
    setSize(page.rows);
  };

  useEffect(() => {
    setFilter((prev) => ({
      ...prev,
      page: page,
      limit: size,
    }));
  }, [page, size]);

  const betsQuery: any = useQuery(
    [betApi.ListQueryKey, { filter }],
    async () => await betApi.list<IBetPageableList>(filter),
    {
      keepPreviousData: true,
      refetchOnWindowFocus: false,
      onSuccess: (response) => {
        const { data } = response;
        setBetItems(data.data);
        setTotalItems(data.total);
      },
      onError: (error) => console.error(error),
    }
  );

  const betData = {
    error: betsQuery.error as AxiosError,
    isError: betsQuery.isError,
    isLoading: betsQuery.isLoading || betsQuery.isFetching,
    items: betItems ?? [],
    totalItems: totalItems ?? 0,
  };

  useEffect(() => {
    setFilter((prev) => ({ ...prev, page: 1 }));
  }, [filter.id, filter.status]);

  const handleNewBet = () => {
    navigate("./create-bet");
  };

  const handleCancelBet = (id: string) => {
    submitCancelMutation.mutate(id);
  };

  const submitCancelMutation = useMutation({
    mutationFn: async (id: string) => {
      return await betApi.cancel<IBetCanceled>(id);
    },
    onSuccess: (response) => handleSuccess(response),
    onError: (error) => handleError(error),
  });

  const handleSuccess = (response) => {
    toast.current.show({
      severity: "success",
      summary: "Cancelamento",
      detail: "Aposta cancelada com sucesso!",
      life: 10000,
    });
    updateBalance(response.data.balance);
    queryClient.invalidateQueries(betApi.ListQueryKey).then();

  };

  const handleError = (error) => {
    toast.current.show({
      severity: "error",
      summary: "Cancelamento",
      detail:
        "Ocorreu um erro ao cancelar a aposta! " + error.response.data.message,
      life: 10000,
    });
  };

  return {
    requests: {
      filter: filter,
      isLoading: betData.isLoading,
      items: betData.items,
      totalItems: betData.totalItems,
      handleNextPageItems,
      size: size,
    },
    toast,
    cancelBet: handleCancelBet,
    newBet: handleNewBet,
  };
};

export default useBetsList;
