import { FC } from "react";
import { useAuth } from "../../context/hooks/useAuth";
import { Outlet } from "react-router-dom";

const Layout: FC = () => {
  const { user, balance } = useAuth();

  return (
    <>
      {user ? `${user.name} - Saldo: ${user.currency} ${balance}`  : null}
      <Outlet />
    </>
  );
};

export default Layout;
