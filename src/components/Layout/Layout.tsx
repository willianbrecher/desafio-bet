import { FC } from "react";
import { useAuth } from "../../context/hooks/useAuth";
import { Outlet, useNavigate } from "react-router-dom";
import { Menubar } from "primereact/menubar";

const Layout: FC = () => {
  const { user, balance, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const items = [
    {
      label: "Início",
      command: () => navigate("/"),
    },
    {
      label: "Entrar",
      command: () => navigate("/login"),
      visible: !isAuthenticated,
    },
    {
      label: "Registrar",
      command: () => navigate("/register"),
      visible: !isAuthenticated,
    },
    {
      label: "Minhas apostas",
      command: () => navigate("/bets"),
      visible: isAuthenticated,
    },
    {
      label: "Logout",
      command: () => {
        logout();
        navigate("/");
      },
      visible: isAuthenticated,
    },
  ];

  const profile = (
    <>
      <label>{user ? `${user.name}` : null}</label>
      <label>{user ? `Saldo: ${user.currency} ${balance}` : null}</label>
    </>
  );

  return (
    <>
      <Menubar model={items} end={profile} />
      <div>
        <Outlet />
      </div>
    </>
  );
};

export default Layout;
