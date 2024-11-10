import { createContext, useRef, useState } from "react";
import { IUser } from "../types/auth.types";
import { Toast } from "primereact/toast";

interface AuthContextValues {
  user?: IUser | null;
  token?: string | null;
  balance?: number | null;
  isAuthenticated: boolean;
  toast?: any | null;
  logout: () => void | null;
  login: (user: IUser) => void | null;
  updateBalance: (balance: number) => void | null;
}

interface AuthProviderProps {
  children?: React.ReactNode;
}

export const AuthContext = createContext<AuthContextValues>({
  isAuthenticated: false,
  logout: () => null,
  login: () => null,
  updateBalance: () => null
});

export const AuthProvider = (props: AuthProviderProps): JSX.Element => {
  const { children } = props;
  const toast = useRef(null);

  const [token, setToken] = useState<string | null>(
    localStorage.getItem("access_token")
  );

  const [user, setUser] = useState<IUser | null>(
    JSON.parse(localStorage.getItem("logged_user") as string)
  );

  const [balance, setBalance] = useState<number | null>(
    JSON.parse(localStorage.getItem("balance") as string)
  );

  const isAuthenticated = !!token;

  const logout = (): void => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("logged_user");
    localStorage.removeItem("balance");
    setToken(null);
    setUser(null);
  };

  const login = (user: IUser): void => {
    localStorage.setItem("access_token", user.accessToken);
    localStorage.setItem("balance", user.balance.toString());
    localStorage.setItem("logged_user", JSON.stringify(user));
    setToken(user.accessToken);
    setUser(user);
    setBalance(user.balance);
  };

  const updateBalance = (balance: number) => {
    setBalance(balance);
    localStorage.setItem("balance", balance.toString());
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        balance,
        isAuthenticated,
        logout,
        login,
        updateBalance,
        toast,
      }}
    >
      <Toast ref={toast} />
      {children}
    </AuthContext.Provider>
  );
};
