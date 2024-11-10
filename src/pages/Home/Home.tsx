import { Button } from "primereact/button";
import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/hooks/useAuth";

const Home: FC = () => {
  const navigate = useNavigate();

  const { user, isAuthenticated, logout } = useAuth();

  return (
    <>
      Bet challange
      {user && isAuthenticated ? (
        <>
          <Button label="Logout" onClick={() => logout() && navigate("/")} />
          <Button label="Minhas apostas" onClick={() => navigate("/bets")} />
        </>
      ) : (
        <>
          <Button label="Entrar" onClick={() => navigate("/login")} />
          <Button label="Registrar" onClick={() => navigate("/register")} />
        </>
      )}
    </>
  );
};

export default Home;
