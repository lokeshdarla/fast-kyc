"use client";

import { createContext, useState, useContext, ReactNode } from "react";

interface GlobalContextType {
  Customer: boolean;
  setCustomer: React.Dispatch<React.SetStateAction<boolean>>;
  Wallet: string;
  setWallet: React.Dispatch<React.SetStateAction<string>>;
}

export const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

export function ContextProvider({ children }: { children: ReactNode }) {
  const [Customer, setCustomer] = useState<boolean>(true);
  const [Wallet, setWallet] = useState<string>("Connect a Wallet");

  return (
    <GlobalContext.Provider value={{ Customer, setCustomer, Wallet, setWallet }}>
      {children}
    </GlobalContext.Provider>
  );
}

export function useGlobalContext() {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error("useGlobalContext must be used within a ContextProvider");
  }
  return context;
}
