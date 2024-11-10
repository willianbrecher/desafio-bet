import { FC, lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

const BetsList = lazy(() => import("./Bets/List/BetsList"));
const BetsCreate = lazy(() => import("./Bets/Create/BetsCreate"));

const BetsRouter: FC = () => {
  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <Routes>
        <Route path="/" element={<BetsList />}>
          <Route path="/create-bet" element={<BetsCreate />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default BetsRouter;
