"use client";
import { createContext, useState, useContext, ReactNode} from "react";

// Define the types for the context value
// interface GlobalContextType {
//   state: GlobalState;
//   updateState: (key: keyof GlobalState, value: any) => void;
// }

export const GlobalContext = createContext(undefined);

export function ContextProvider(props: any) {

    const [Customer, setCustomer] = useState<Boolean>(false);
    const [Business, setBusiness] = useState<Boolean>(false);

  return(
    <GlobalContext.Provider value={Customer, setCustomer, Business, setBusiness}>
        {props.children}
    </GlobalContext.Provider>
  )
}


