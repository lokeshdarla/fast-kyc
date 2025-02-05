'use client'
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Eye, CheckCircle2, XCircle, Clock, Link as LinkIcon } from 'lucide-react';
import { BusinessLayout } from '@/components/BusinessLayout';
const KYCVerificationTable = () => {
  // Sample data for customers with KYC status
  const customers = [
    {
      id: "KYC001",
      name: "John Smith",
      email: "john.smith@email.com",
      submissionDate: "2025-01-15",
      status: "Verified",
      completedDocs: 6,
      totalDocs: 6,
      blockchain: {
        hash: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
        timestamp: "2025-01-16 14:30:25",
        network: "Ethereum",
        blockNumber: "18234567"
      },
      documents: {
        identity: { status: "Verified", date: "2025-01-15", verifier: "Alice Johnson" },
        address: { status: "Verified", date: "2025-01-15", verifier: "Bob Wilson" },
        banking: { status: "Verified", date: "2025-01-16", verifier: "Charlie Brown" }
      }
    },
    {
      id: "KYC002",
      name: "Sarah Williams",
      email: "sarah.w@email.com",
      submissionDate: "2025-01-20",
      status: "Pending",
      completedDocs: 4,
      totalDocs: 6,
      blockchain: {
        hash: "0x892d35Cc6634C0532925a3b844Bc454e4438f55f",
        timestamp: "2025-01-20 09:15:30",
        network: "Ethereum",
        blockNumber: "18234570"
      },
      documents: {
        identity: { status: "Verified", date: "2025-01-20", verifier: "Alice Johnson" },
        address: { status: "Pending", date: "2025-01-20", verifier: null },
        banking: { status: "Not Submitted", date: null, verifier: null }
      }
    },
    {
      id: "KYC003",
      name: "David Brown",
      email: "david.b@email.com",
      submissionDate: "2025-01-18",
      status: "Rejected",
      completedDocs: 3,
      totalDocs: 6,
      blockchain: {
        hash: "0x962d35Cc6634C0532925a3b844Bc454e4438f66g",
        timestamp: "2025-01-18 16:45:10",
        network: "Ethereum",
        blockNumber: "18234568"
      },
      documents: {
        identity: { status: "Rejected", date: "2025-01-19", verifier: "Alice Johnson" },
        address: { status: "Verified", date: "2025-01-18", verifier: "Bob Wilson" },
        banking: { status: "Pending", date: "2025-01-18", verifier: null }
      }
    }
  ];

  const getStatusBadge = (status) => {
    const variants = {
      Verified: { variant: "success", icon: CheckCircle2 },
      Pending: { variant: "warning", icon: Clock },
      Rejected: { variant: "destructive", icon: XCircle },
      "Not Submitted": { variant: "secondary", icon: XCircle }
    };

    const { variant, icon: Icon } = variants[status] || variants.Pending;

    return (
      <Badge variant={variant} className="flex items-center gap-1">
        <Icon size={14} />
        {status}
      </Badge>
    );
  };

  const CustomerDetails = ({ customer }) => (
    <Tabs defaultValue="documents" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="documents">Documents Status</TabsTrigger>
        <TabsTrigger value="blockchain">Blockchain Details</TabsTrigger>
      </TabsList>

      <TabsContent value="documents" className="space-y-4">
        <div className="space-y-4">
          {Object.entries(customer.documents).map(([docType, details]) => (
            <div key={docType} className="border rounded-lg p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium capitalize">{docType} Documents</h3>
                  <p className="text-sm text-gray-500">
                    {details.date ? `Last updated: ${details.date}` : 'Not submitted yet'}
                  </p>
                </div>
                {getStatusBadge(details.status)}
              </div>
              {details.verifier && (
                <p className="text-sm text-gray-500 mt-2">
                  Verified by: {details.verifier}
                </p>
              )}
            </div>
          ))}
        </div>
      </TabsContent>

      <TabsContent value="blockchain" className="space-y-4">
        <div className="border rounded-lg p-4 space-y-3">
          <div>
            <p className="text-sm text-gray-500">Transaction Hash</p>
            <p className="font-mono text-sm break-all">{customer.blockchain.hash}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Block Number</p>
            <p className="font-mono text-sm">{customer.blockchain.blockNumber}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Network</p>
            <p>{customer.blockchain.network}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Timestamp</p>
            <p>{customer.blockchain.timestamp}</p>
          </div>
          <Button variant="outline" className="w-full mt-4">
            <LinkIcon className="w-4 h-4 mr-2" />
            View on Explorer
          </Button>
        </div>
      </TabsContent>
    </Tabs>
  );

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
              <TableHead>Name</TableHead>
              <TableHead>Submission Date</TableHead>
              <TableHead>Progress</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {customers.map((customer) => (
              <TableRow key={customer.id}>
                <TableCell className="font-medium">{customer.id}</TableCell>
                <TableCell>
                  <div>
                    <p>{customer.name}</p>
                    <p className="text-sm text-gray-500">{customer.email}</p>
                  </div>
                </TableCell>
                <TableCell>{customer.submissionDate}</TableCell>
                <TableCell>
                  <div className="text-sm">
                    {customer.completedDocs} of {customer.totalDocs} documents
                  </div>
                </TableCell>
                <TableCell>{getStatusBadge(customer.status)}</TableCell>
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
                        <DialogTitle>KYC Details - {customer.name}</DialogTitle>
                      </DialogHeader>
                      <CustomerDetails customer={customer} />
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
