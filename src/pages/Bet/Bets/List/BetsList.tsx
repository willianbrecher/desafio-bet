import { Button } from "primereact/button";
import { FC } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../../../../context/hooks/useAuth";
import useBetsList from "./hooks/useBetsList";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import moment from "moment";
import 'moment-timezone';
import { IBetPageableListItem } from "../../../../types/bet.types";
import { Toast } from "primereact/toast";

const BetsList: FC = () => {
  const navigate = useNavigate();

  const { user, logout } = useAuth();
  const { requests, newBet, cancelBet, toast } = useBetsList();

  const dateTemplate = (item: IBetPageableListItem) => {
    return moment(item.createdAt).format("DD/MM/YYYY H:mm:ss");
  };

  const actionTemplate = (item: IBetPageableListItem) => {
    return item.status !== "canceled" ? <Button icon="pi pi-ban" severity="danger" label="Cancelar" raised onClick={() => cancelBet(item.id)}/> : <></>;
  };

  const winAmountTemplate = (item: IBetPageableListItem) => {
    return item.winAmount ? item.winAmount : 0;
  };  

  return (
    <>
      <Toast ref={toast} />
      <Button label="Create" onClick={newBet} />
      <Button label="Logout" onClick={() => logout()} />
      <DataTable
        value={requests.items}
        paginator
        rows={requests.size}
        lazy
        rowsPerPageOptions={[5, 10, 25, 50, 100]}
        onPage={(page) => requests.handleNextPageItems(page)}
        totalRecords={requests.totalItems}
      >
        <Column
          field="createdAt"
          header="Data"
          style={{ width: "25%" }}
          body={dateTemplate}
        />
        <Column field="amount" header="Aposta" style={{ width: "25%" }} />
        <Column field="winAmount" header="Ganho" style={{ width: "25%" }} body={winAmountTemplate}/>
        <Column field="status" header="Resultado" style={{ width: "25%" }} />
        <Column header="Ações" style={{ width: "25%" }} body={actionTemplate} />
      </DataTable>
      <Outlet />
    </>
  );
};

export default BetsList;
