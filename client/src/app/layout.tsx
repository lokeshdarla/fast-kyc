import "@aptos-labs/wallet-adapter-ant-design/dist/index.css";
import "./globals.css";
import { ContextProvider} from "@/context/context";
import { StateContextProvider } from "@/context/ContractContext";
import { WalletProvider } from "@/components/WalletProvider";
import { Toaster } from "@/components/ui/toaster";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import { PropsWithChildren } from "react";
import { AutoConnectProvider } from "@/components/AutoConnectProvider";
import { ReactQueryClientProvider } from '@/components/ReactQueryClientProvider';
import Navbar from "@/components/Navbar";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Aptos Wallet Adapter Example",
  description:
    "An example of how to use Aptos Wallet Adapter with React and Next.js.",
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "flex justify-center min-h-screen bg-background font-sans antialiased",
          fontSans.variable,
        )}
      >
    <ContextProvider>
        <AutoConnectProvider>
          <ReactQueryClientProvider>
            <WalletProvider>
              <StateContextProvider>

              <div className='w-full max-w-screen-xl'>
              
                {children}
              </div>
              <Toaster />
              </StateContextProvider>
            </WalletProvider>
          </ReactQueryClientProvider>
        </AutoConnectProvider>
    </ContextProvider>
      </body>

    </html>
  );
}
