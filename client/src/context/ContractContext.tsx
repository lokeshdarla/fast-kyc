
"use client"
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
  handleUploadDocument?: (
    docType: string,
    docContent: string,
    docIpfscode: string
  ) => Promise<void>;
  handleVerifyKYC?: (
    orgAddress: string
  ) => Promise<void>;
}

export const StateContext = createContext<Partial<StateContextProps>>({});

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
    if (!account) {
      console.log("ndmc");
      return;
    }

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
      await aptos.waitForTransaction({ transactionHash: response.hash });
      alert("Organization registered successfully on Devnet!");
    } catch (error) {
      console.error("Failed to register organization", error);
      alert("Transaction failed. Check the console for details.");
    }
  };

  const handleUploadDocument = async (
    docType: string,
    docContent: string,
    docIpfscode: string
  ) => {
    const docContentHash = Array.from(new TextEncoder().encode(docContent));
    const docIPFSHash = Array.from(new TextEncoder().encode(docIpfscode));

    const payload: InputTransactionData = {
      data: {
        function:
          `${CONTRACT_ADRESS}::${MODULE_NAME}::upload_document`,
        functionArguments: [docType, docContentHash, docIPFSHash],
      },
    };

    try {
      const response = await signAndSubmitTransaction(payload);
      await aptos.waitForTransaction({ transactionHash: response.hash });
      alert("Document uploaded successfully!");
    } catch (error) {
      console.error("Failed to upload document", error);
      alert("Document upload failed.");
    }


  };

  const handleVerifyKYC = async (orgAddress: string) => {
    if (!account || !orgAddress) return;
    try {
      const payload: InputTransactionData = {
        data: {
          function:
            `${CONTRACT_ADRESS}::${MODULE_NAME}::verify_kyc`,
          functionArguments: [orgAddress],
        },
      };

      const response = await signAndSubmitTransaction(payload);
      await aptos.waitForTransaction({ transactionHash: response.hash });

      await checkVerificationStatus(orgAddress);
      alert("KYC verification successful!");
    } catch (error) {
      console.error("Failed to verify KYC:", error);
      alert(
        "KYC verification failed. Please ensure all required documents are uploaded."
      );
    }
  };

  const checkVerificationStatus = async (orgAddress: string) => {
    if (!account?.address || !orgAddress) return;

    try {
      const response = await aptos.view({
        payload: {
          function:
            `${CONTRACT_ADRESS}::${MODULE_NAME}::is_verified`,
          functionArguments: [account.address, orgAddress],
        },
      });
      console.log(response);
    } catch (error) {
      console.error("Failed to check verification status:", error);
    }
  };

  return (
    <StateContext.Provider
      value={{
        handleRegisterOrganization,
        handleUploadDocument,
        handleVerifyKYC,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
