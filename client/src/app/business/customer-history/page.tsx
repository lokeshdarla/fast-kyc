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
                  <TableCell>{tx.hash}</TableCell>
                  <TableCell>{tx.sender}</TableCell>
                  <TableCell>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4 mr-2" />
                          View Details
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl">
                        <DialogHeader>
                          <DialogTitle>Transaction Details</DialogTitle>
                        </DialogHeader>
                        <pre className="text-sm">{JSON.stringify(tx, null, 2)}</pre>
                      </DialogContent>
                    </Dialog>
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
