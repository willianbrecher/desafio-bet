import { Button } from "primereact/button";
import { FC } from "react";
import { Outlet } from "react-router-dom";
import useBetsList from "./hooks/useBetsList";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import moment from "moment";
import "moment-timezone";
import { IBetPageableListItem } from "../../../../types/bet.types";
import { Toast } from "primereact/toast";

const BetsList: FC = () => {
  const { requests, newBet, cancelBet, toast } = useBetsList();

  const dateTemplate = (item: IBetPageableListItem) => {
    return moment(item.createdAt).format("DD/MM/YYYY H:mm:ss");
  };

  const actionTemplate = (item: IBetPageableListItem) => {
    return item.status !== "canceled" ? (
      <Button
        size="small"
        icon="pi pi-ban"
        severity="danger"
        label="Cancelar"
        raised
        onClick={() => cancelBet(item.id)}
      />
    ) : (
      <></>
    );
  };

  const winAmountTemplate = (item: IBetPageableListItem) => {
    return item.winAmount ? item.winAmount : 0;
  };

  const renderHeader = () => {
    return (
      <div className="flex justify-content-between">
        <Button label="Apostar" onClick={newBet} size="small"/>
      </div>
    );
  };

  return (
    <>
      <Toast ref={toast} />
      <DataTable
        header={renderHeader}
        value={requests.items}
        paginator
        rows={requests.size}
        lazy
        first={requests.first}
        rowsPerPageOptions={[5, 10, 25, 50, 100]}
        onPage={requests.handleNextPageItems}
        totalRecords={requests.totalItems}
      >
        <Column
          field="createdAt"
          header="Data"
          style={{ width: "25%" }}
          body={dateTemplate}
        />
        <Column field="amount" header="Aposta" style={{ width: "25%" }} />
        <Column
          field="winAmount"
          header="Ganho"
          style={{ width: "25%" }}
          body={winAmountTemplate}
        />
        <Column field="status" header="Resultado" style={{ width: "25%" }} />
        <Column header="Ações" style={{ width: "25%" }} body={actionTemplate} />
      </DataTable>
      <Outlet />
    </>
  );
};

export default BetsList;
