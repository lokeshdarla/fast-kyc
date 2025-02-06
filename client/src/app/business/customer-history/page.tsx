'use client';
import React, { useContext, useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Eye, CheckCircle2, XCircle, Clock } from 'lucide-react';
import { BusinessLayout } from '@/components/BusinessLayout';
import { StateContext } from '@/context/ContractContext';
import Link from 'next/link';

interface Transaction {
  hash: string;
  sender: string;
  payload?: {
    arguments?: any[];
  };
}

const KYCVerificationTable = () => {

  const { fetchTransactions } = useContext(StateContext);
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    const fetchTransactionsFiltered = async () => {
      try {
        if (!fetchTransactions) return;
        const data = await fetchTransactions();
        console.log("Fetched Transactions:", data);
        if (data)
          setTransactions(data);
      } catch (error) {
        console.error("Failed to fetch transactions:", error);
      }
    };

    fetchTransactionsFiltered();
  }, [fetchTransactions]);

  const getStatusBadge = (status: string) => {
    const variants = {
      Verified: { variant: "success", icon: CheckCircle2 },
      Pending: { variant: "warning", icon: Clock },
      Rejected: { variant: "destructive", icon: XCircle },
      "Not Submitted": { variant: "secondary", icon: XCircle },
    };

    //@ts-ignore
    const { variant, icon: Icon } = variants[status] || variants.Pending;

    return (
      <Badge variant={variant} className="flex items-center gap-1">
        <Icon size={14} />
        {status}
      </Badge>
    );
  };

  return (
    <BusinessLayout>
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Customer KYC Verifications</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer ID</TableHead>
                <TableHead>Details</TableHead>
                <TableHead>Transaction Hash</TableHead>
                <TableHead>Sender</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((tx, index) => (
                <TableRow key={tx.hash || index}>
                  <TableCell>{tx.payload?.arguments?.[0] || "-"}</TableCell>
                  <TableCell>
                    {Array.isArray(tx.payload?.arguments?.[2])
                      ? tx.payload.arguments[2].join(", ")
                      : "-"}
                  </TableCell>
                  <TableCell>{tx.hash.slice(0, 15) + "..."}</TableCell>
                  <TableCell>{tx.sender}</TableCell>
                  <TableCell>

                    <Link
                      className="inline-flex items-center px-5 py-2 justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-primary text-primary-foreground shadow hover:bg-primary/90"
                      href={`https://explorer.aptoslabs.com/txn/${tx.hash}?network=devnet`} target='_blank'>

                      View Details
                    </Link>

                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </BusinessLayout>
  );
};

export default KYCVerificationTable;
