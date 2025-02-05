import React, { useEffect, useState, createContext, useContext } from "react";
import { aptosClient, isSendableNetwork } from "@/utils";
import {
  InputTransactionData,
  useWallet,
} from "@aptos-labs/wallet-adapter-react";
import { Aptos, AptosConfig, Network } from "@aptos-labs/ts-sdk";

interface StateContextProps {
  handleRegisterOrganization?: (
    orgName: string,
    orgDescription: string,
    requiredDocs: string[]
  ) => Promise<void>;
}

const StateContext = createContext<Partial<StateContextProps>>({});

export const StateContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { account, signAndSubmitTransaction, network } = useWallet();
  const CONTRACT_ADRESS = "0x611227b9b8663dae6d0f28d59a31979abe6c200237e130832b6cbd43ca242dbc"
  const MODULE_NAME = "kycv7";
  const aptosConfig = new AptosConfig({ network: Network.DEVNET });
  const aptos = new Aptos(aptosConfig);
  const handleRegisterOrganization = async (
    orgName: string,
    orgDescription: string,
    requiredDocs: string[]
  ) => {
    if (!account) return;

    const payload: InputTransactionData = {
      data: {
        function:
          `${CONTRACT_ADRESS}::${MODULE_NAME}::create_organization`,
        functionArguments: [orgName, orgDescription, requiredDocs],
      },
    };

    try {
      const response = await signAndSubmitTransaction(payload);
      console.log("Transaction Hash:", response.hash);
      await aptos.waitForTransaction(response.hash);
      alert("Organization registered successfully on Devnet!");
    } catch (error) {
      console.error("Failed to register organization", error);
      alert("Transaction failed. Check the console for details.");
    }
  };

  return (
    <StateContext.Provider
      value={{
        handleRegisterOrganization,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
