import { Button } from "primereact/button";
import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/hooks/useAuth";
import { DataScroller } from "primereact/datascroller";
import Layout from "../../components/Layout/Layout";

const Wallet: FC = () => {
  const navigate = useNavigate();

  const { user, logout } = useAuth();

  const mock = [
    { id: "string1", createdAt: "string1", amount: 0, winAmount: 0, status: 0 },
    { id: "string2", createdAt: "string2", amount: 0, winAmount: 0, status: 0 },
    { id: "string3", createdAt: "string3", amount: 0, winAmount: 0, status: 0 },
    { id: "string4", createdAt: "string4", amount: 0, winAmount: 0, status: 0 },
    { id: "string5", createdAt: "string5", amount: 0, winAmount: 0, status: 0 },
    { id: "string6", createdAt: "string6", amount: 0, winAmount: 0, status: 0 },
    { id: "string7", createdAt: "string7", amount: 0, winAmount: 0, status: 0 },
  ];

  const itemTemplate = (item) => {
    return (
      <div className="col-12">
        <div className="flex flex-column xl:flex-row xl:align-items-start p-4 gap-4">
          <div className="flex flex-column lg:flex-row">{item.id}</div>
          <div className="flex flex-column lg:flex-row">{item.createdAt}</div>
          <div className="flex flex-column lg:flex-row">{item.amount}</div>
          <div className="flex flex-column lg:flex-row">{item.winAmount}</div>
          <div className="flex flex-column lg:flex-row">{item.status}</div>
        </div>
      </div>
    );
  };

  return (
    <Layout>
      <>
        {user ? user.name : null}
        <DataScroller
          value={mock}
          itemTemplate={itemTemplate}
          rows={10}
          inline
          scrollHeight="500px"
          header="Minhas transações"
        />
        <Button label="Logout" onClick={() => logout() && navigate("/")} />
      </>
    </Layout>
  );
};

export default Wallet;
