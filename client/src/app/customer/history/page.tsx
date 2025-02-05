'use client'
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, ArrowUpRight, ArrowDownLeft, Search, Copy } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { CustomerLayout } from '@/components/CustomerLayout';

const TransactionsPage = () => {
  // Sample transaction data - replace with your actual data
  const transactions = [
    {
      id: 1,
      type: 'incoming',
      amount: '50 APT',
      from: '0x3a1b2c4d5e6f7890a1234567890abcdef1234567890abcdef1234567890abcd',
      to: '0x4d5e6f7890a1234567890abcdef1234567890abcdef1234567890abcdef1234',
      status: 'completed',
      timestamp: '2024-02-03T10:30:00',
      kycStatus: 'verified',
      sequence_number: '1001',
      module: 'coin',
      resource_account: '0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef12345678',
      transactionHash: '0x1234abcd5678efgh90ijkl12mnop34qrst56uvwx78yz'
    },
    {
      id: 2,
      type: 'outgoing',
      amount: '25 APT',
      from: '0x4d5e6f7890a1234567890abcdef1234567890abcdef1234567890abcdef1234',
      to: '0x5e6f7890a1234567890abcdef1234567890abcdef1234567890abcdef123456',
      status: 'pending',
      timestamp: '2024-02-03T09:15:00',
      kycStatus: 'unverified',
      sequence_number: '1002',
      module: 'coin',
      resource_account: '0x7890abcdef1234567890abcdef1234567890abcdef1234567890abcdef1234',
      transactionHash: '0x5678efgh90ijkl12mnop34qrst56uvwx78yz1234abcd'
    },
    // ... (other transactions remain the same, just add transactionHash to each)
  ];

  const truncateAddress = (address: String) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const copyToClipboard = (text: any) => {
    navigator.clipboard.writeText(text).then(() => {
      // Optional: Add a toast or notification that text was copied
      console.log('Copied to clipboard');
    });
  };

  return (
    <CustomerLayout>
          <div className="container mx-auto p-6 max-w-6xl">
      <div className="space-y-6">
        {/* Header Section */}
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">KYC Document Transaction History</h1>
          <div className="flex space-x-4">
            <div className="w-64">
              <Input
                placeholder="Search transactions..."
                className="w-full"
                type="search"
                //@ts-ignore
                icon={<Search className="w-4 h-4" />}
              />
            </div>
            <Select defaultValue="all">
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Filter by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Transactions</SelectItem>
                <SelectItem value="incoming">Incoming</SelectItem>
                <SelectItem value="outgoing">Outgoing</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Transactions List */}
        <Card>
          <CardHeader>
            <CardTitle>Recent KYC Document Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {transactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between p-4 rounded-lg border hover:bg-gray-50 transition-colors"
                >
                  {/* Transaction Icon and Type */}
                  <div className="flex items-center space-x-4">
                    <div className={`p-2 rounded-full ${transaction.type === 'incoming'
                      ? 'bg-green-100 text-green-600'
                      : 'bg-red-100 text-red-600'
                      }`}>
                      {transaction.type === 'incoming'
                        ? <ArrowDownLeft className="w-6 h-6" />
                        : <ArrowUpRight className="w-6 h-6" />
                      }
                    </div>
                    <div>
                      <p className="font-medium">
                        {transaction.type === 'incoming' ? 'KYC Doc Received' : 'KYC Doc Sent'}
                      </p>
                      <p className="text-sm text-gray-500">
                        {transaction.amount}
                      </p>
                    </div>
                  </div>

                  {/* Address and KYC Status */}
                  <div className="flex flex-col items-end">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm">
                        {transaction.type === 'incoming' ? 'From' : 'To'}:
                      </span>
                      <span className="font-mono">
                        {truncateAddress(
                          transaction.type === 'incoming'
                            ? transaction.from
                            : transaction.to
                        )}
                      </span>
                      <Badge variant={
                        transaction.kycStatus === 'verified'
                          ? 'default'
                          : 'destructive'
                      }>
                        {transaction.kycStatus}
                      </Badge>
                    </div>
                    <div className="flex items-center text-sm text-gray-500 mt-1">
                      <Clock className="w-4 h-4 mr-1" />
                      {new Date(transaction.timestamp).toLocaleString()}
                    </div>
                  </div>

                  {/* Transaction Hash */}
                  <div className="flex items-center space-x-2">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <span className="font-mono text-sm">
                            {truncateAddress(transaction.transactionHash)}
                          </span>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{transaction.transactionHash}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    <button
                      onClick={() => copyToClipboard(transaction.transactionHash)}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <Copy className="w-4 h-4" />
                    </button>

                    {/* Status Badge */}
                    <Badge variant={
                      transaction.status === 'completed'
                        ? 'default'
                        : 'secondary'
                    }>
                      {transaction.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
    </CustomerLayout>

  );
};

export default TransactionsPage;
