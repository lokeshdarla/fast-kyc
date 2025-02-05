"use client";

import React from 'react';
import { useAutoConnect } from "@/components/AutoConnectProvider";
import { WalletSelector as ShadcnWalletSelector } from "@/components/WalletSelector";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { MyWallet } from "@/utils/standardWallet";
import { registerWallet } from "@aptos-labs/wallet-standard";

// Register wallet on client-side only
if (typeof window !== "undefined") {
  const myWallet = new MyWallet();
  registerWallet(myWallet);
}

export default function Home() {
  const { network } = useWallet();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <header className="text-center space-y-4">
            <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Aptos Wallet Interface
            </h1>
            {network?.name && (
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900">
                <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                <span className="text-sm font-medium text-blue-900 dark:text-blue-100">
                  {network.name}
                </span>
              </div>
            )}
          </header>

          <WalletSelection />

          <NetworkStatus />
        </div>
      </main>
    </div>
  );
}

function WalletSelection() {
  const { autoConnect, setAutoConnect } = useAutoConnect();

  return (
    <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader className="space-y-2">
        <CardTitle className="text-2xl">Connect Wallet</CardTitle>
        <CardDescription>
          Select your preferred wallet to interact with the Aptos network
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="flex justify-center p-6">
            <ShadcnWalletSelector />
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <Label htmlFor="auto-connect-switch" className="flex items-center gap-2">
              <span>Auto Reconnect</span>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Automatically connect on page load
              </span>
            </Label>
            <Switch
              id="auto-connect-switch"
              checked={autoConnect}
              onCheckedChange={setAutoConnect}
              className="data-[state=checked]:bg-blue-600"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function NetworkStatus() {
  const { account, connected, network } = useWallet();

  if (!connected) return null;

  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle>Network Status</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <StatusItem
              label="Account"
              value={account?.address?.toString() ?? "Not connected"}
            />
            <StatusItem
              label="Network"
              value={network?.name ?? "Unknown"}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

//@ts-ignore
function StatusItem({ label, value }) {
  return (
    <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800">
      <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{label}</p>
      <p className="mt-1 font-mono text-sm break-all">{value}</p>
    </div>
  );
}
