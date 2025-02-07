'use client'
import React, { useContext, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Wallet } from 'lucide-react';
import Cookies from 'js-cookie';
import Link from 'next/link';
import { StateContext } from '@/context/ContractContext';
import { CustomerLayout } from '@/components/CustomerLayout';

const WALLET_COOKIE_NAME = 'wallet-address';

const WalletKYCHandler = () => {
  const searchParams = useSearchParams();
  const { handleVerifyKYC } = useContext(StateContext);
  const [walletAddress, setWalletAddress] = useState('');

  useEffect(() => {

    const addressFromQuery = searchParams.get('wallet-address');

    if (addressFromQuery) {

      Cookies.set(WALLET_COOKIE_NAME, addressFromQuery, { expires: 1 });
      setWalletAddress(addressFromQuery);
    } else {
      const addressFromCookie = Cookies.get(WALLET_COOKIE_NAME);
      if (addressFromCookie) {
        setWalletAddress(addressFromCookie);
      }
    }
  }, [searchParams]);




  const handleCompleteKYC = async () => {
    // Remove wallet address from cookies after starting KYC
    Cookies.remove(WALLET_COOKIE_NAME);
    //@ts-ignore
    await handleVerifyKYC(walletAddress);

    // You can add navigation logic here
  };

  if (!walletAddress) {
    return null;
  }

  return (
    <CustomerLayout>
      <div className="w-full max-w-2xl mx-auto mt-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Wallet className="w-5 h-5" />
              Connected Wallet
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-lg break-all font-mono">
                {walletAddress}
              </div>

              <div className="flex justify-end">
                <Link href="/customer/document-verification">
                  <Button
                    onClick={handleCompleteKYC}
                    className="w-full sm:w-auto"
                  >
                    Complete KYC
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </CustomerLayout>
  );
};

export default WalletKYCHandler;
