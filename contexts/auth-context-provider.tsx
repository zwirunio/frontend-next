"use client";
import React, {createContext, useState} from "react";

export interface Auth {
  email: string;
}

export interface AuthContextProps {
  auth: Auth | null;
  setAuth: (auth: Auth | null) => void;
}

export const AuthContext = createContext<AuthContextProps | undefined>(undefined);

function AuthContextProvider ({ children }: { children: React.ReactNode }) {

  const [auth, setAuth] = useState<Auth | null>(null);

  return (
    <AuthContext.Provider value={{auth, setAuth}}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContextProvider;