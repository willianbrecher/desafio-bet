import { FC } from "react";
import Register from "./Register/Register";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./Home/Home";
import Login from "./Login/Login";
import Wallet from "./Wallet/Wallet";
import BetsRouter from "./Bet/BetsRouter";
import { useAuth } from "../context/hooks/useAuth";
import Layout from "../components/Layout/Layout";

const Router: FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {isAuthenticated ? (
          <>
            <Route path="/bets/*" element={<BetsRouter />} />
            <Route path="/wallet" element={<Wallet />} />
          </>
        ) : (
          <Route path="*" element={<Navigate to="/login" />} />
        )}
      </Route>
    </Routes>
  );
};

export default Router;
