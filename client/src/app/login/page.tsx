"use client";

import React, { useEffect } from 'react';
import { useAutoConnect } from "@/components/AutoConnectProvider";
import { WalletSelector as ShadcnWalletSelector } from "@/components/WalletSelector";
import { redirect, useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { MyWallet } from "@/utils/standardWallet";
import { registerWallet } from "@aptos-labs/wallet-standard";
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { GlobalContext } from "@/context/context";
import { useContext } from 'react';
import { fetchUser } from '@/utils';

// Register wallet on client-side only
if (typeof window !== "undefined") {
  const myWallet = new MyWallet();
  registerWallet(myWallet);
}

export default function Home() {
  const { account, network, connected } = useWallet();
  const router = useRouter();

  useEffect(() => {
    if (!connected || !account) {
      router.push("/login");
      return;
    }

    const checkUserRole = async () => {
      try {
        const user = await fetchUser(account.address);
        if (user) {
          if (user.role !== "CUSTOMER")
            router.push("/business");
          else {
            router.push("/customer");
          }
        } else {
          return;
        }
      } catch (error) {
        console.error("Error fetching user:", error);
        router.push("/login"); // Fallback in case of an error
      } finally {
        //setLoading(false);
      }
    };

    checkUserRole();
  }, [account, connected, router]);

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
  const { setCustomer } = useContext<any>(GlobalContext);

  const handleRadioChange = (value: string) => {
    if (value === "Customer") {
      setCustomer(true);
    } else {
      setCustomer(false);
    }
  };

  return (
    <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader className="space-y-2">
        <CardTitle className="text-2xl">
          <div className='flex flex-row justify-between'>
            <div>Connect Wallet</div>
            <div>

              <RadioGroup defaultValue="Customer"
                onValueChange={(value) => handleRadioChange(value)}
              >

                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Customer" id="r2" />
                  <Label htmlFor="r2">Customer</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Business" id="r3" />
                  <Label htmlFor="r3">Business</Label>
                </div>
              </RadioGroup>

            </div>

          </div>
        </CardTitle>
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
  const { Customer } = useContext<any>(GlobalContext);
  const { setWallet } = useContext<any>(GlobalContext);

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
              value={setWallet(account?.address?.toString()) ?? "Not connected"}
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
