import axios from "axios";
import { Aptos, AptosConfig, Network } from "@aptos-labs/ts-sdk";
import { NetworkInfo } from "@aptos-labs/wallet-adapter-core";

export const aptosClient = (network?: NetworkInfo | null) => {
  if (network?.name === Network.DEVNET) {
    return DEVNET_CLIENT;
  } else if (network?.name === Network.TESTNET) {
    return TESTNET_CLIENT;
  } else if (network?.name === Network.MAINNET) {
    throw new Error("Please use devnet or testnet for testing");
  } else {
    const CUSTOM_CONFIG = new AptosConfig({
      network: Network.CUSTOM,
      fullnode: network?.url,
    });
    return new Aptos(CUSTOM_CONFIG);
  }
};

// Devnet client
export const DEVNET_CONFIG = new AptosConfig({
  network: Network.DEVNET,
});
export const DEVNET_CLIENT = new Aptos(DEVNET_CONFIG);

// Testnet client
export const TESTNET_CONFIG = new AptosConfig({ network: Network.TESTNET });
export const TESTNET_CLIENT = new Aptos(TESTNET_CONFIG);

export const isSendableNetwork = (
  connected: boolean,
  networkName?: string,
): boolean => {
  return connected && !isMainnet(connected, networkName);
};

export const isMainnet = (
  connected: boolean,
  networkName?: string,
): boolean => {
  return connected && networkName === Network.MAINNET;
};



export const fetchUser = async (wallet_address: string) => {
  try {
    const response = await axios.get(`/api/user`);
    const users = response.data.data;
    const foundUser = users.find((user: any) => user.wallet_address === wallet_address);
    if (foundUser) return foundUser;
    return null;
  } catch (error) {
    console.error("Error fetching user:", error);
    return null;
  }
};
