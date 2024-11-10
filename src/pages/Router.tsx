import { FC, ReactNode } from "react";
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
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      {isAuthenticated ? (
        <Route element={<Layout />}>
          <>
            <Route path="/bets/*" element={<BetsRouter />} />
            <Route path="/wallet" element={<Wallet />} />
          </>
        </Route>
      ) : (
        <Route path="*" element={<Navigate to="/login" />} />
      )}
    </Routes>
  );
};

export default Router;
