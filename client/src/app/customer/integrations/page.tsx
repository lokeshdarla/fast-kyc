'use client'
import React, { useState, useMemo } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import {
  Button
} from "@/components/ui/button";
import {
  Eye,
  FileText,
  Clock,
  CheckCircle,
  XCircle,
  Filter,
  Download,
  RotateCcw
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { CustomerLayout } from '@/components/CustomerLayout';

interface BlockchainDetails {
  network: string;
  module: string;
  timestamp: string;
  verificationNode: string;
}

interface KYCCompletion {
  id: number;
  provider: string;
  date: string;
  status: 'completed' | 'pending' | 'failed';
  documentsShared: string[];
  transactionHash: string;
  blockchainDetails: BlockchainDetails;
}

const KYCTransactionsPage = () => {
  const [selectedTransaction, setSelectedTransaction] = useState<KYCCompletion | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [filter, setFilter] = useState('');
  const [statusFilters, setStatusFilters] = useState<string[]>(['completed', 'pending', 'failed']);

  const kycCompletions = [
    {
      id: 1,
      provider: 'Jumio',
      date: '2024-01-15',
      status: 'completed',
      documentsShared: ['Passport', 'Proof of Address'],
      transactionHash: '0x1234abcd5678efgh90ijkl12mnop34qrst56uvwx78yz',
      blockchainDetails: {
        network: 'Aptos',
        module: 'KYC_Verification',
        timestamp: '2024-01-15T10:30:00Z',
        verificationNode: '0x4d5e6f7890a1234567890abcdef1234567890abcdef'
      }
    },
    {
      id: 2,
      provider: 'Sumsub',
      date: '2024-02-01',
      status: 'pending',
      documentsShared: ['Driver\'s License'],
      transactionHash: '0x5678efgh90ijkl12mnop34qrst56uvwx78yz1234abcd',
      blockchainDetails: {
        network: 'Aptos',
        module: 'KYC_Verification',
        timestamp: '2024-02-01T14:45:00Z',
        verificationNode: '0x7890abcdef1234567890abcdef1234567890abcdef'
      }
    },
    {
      id: 3,
      provider: 'Identity Mind',
      date: '2024-01-22',
      status: 'completed',
      documentsShared: ['Passport', 'Bank Statement'],
      transactionHash: '0x9012ijkl34mnop56qrst78uvwx90yz1234abcd5678ef',
      blockchainDetails: {
        network: 'Aptos',
        module: 'KYC_Verification',
        timestamp: '2024-01-22T09:15:00Z',
        verificationNode: '0xabcdef1234567890abcdef1234567890abcdef1234'
      }
    },
    {
      id: 4,
      provider: 'Shufti Pro',
      date: '2024-01-28',
      status: 'completed',
      documentsShared: ['National ID'],
      transactionHash: '0x3456mnop78qrst90uvwx12yz34abcd56efgh5678ijkl',
      blockchainDetails: {
        network: 'Aptos',
        module: 'KYC_Verification',
        timestamp: '2024-01-28T11:10:00Z',
        verificationNode: '0x5678ijkl90mnop12qrst34uvwx56yz78abcd90efgh'
      }
    },
    {
      id: 5,
      provider: 'Onfido',
      date: '2024-02-02',
      status: 'failed',
      documentsShared: ['Passport'],
      transactionHash: '0x7890qrst12uvwx34yz56abcd78efgh90ijkl12mnop34',
      blockchainDetails: {
        network: 'Aptos',
        module: 'KYC_Verification',
        timestamp: '2024-02-02T15:25:00Z',
        verificationNode: '0x9012mnop34qrst56uvwx78yz90abcd12efgh34ijkl'
      }
    },
    {
      id: 6,
      provider: 'Jumio',
      date: '2024-02-03',
      status: 'completed',
      documentsShared: ['Driver\'s License', 'Proof of Address'],
      transactionHash: '0xabcdef5678ijkl90mnop12qrst34uvwx56yz78abcd90',
      blockchainDetails: {
        network: 'Aptos',
        module: 'KYC_Verification',
        timestamp: '2024-02-03T08:50:00Z',
        verificationNode: '0x3456uvwx78yz90abcd12efgh34ijkl56mnop78qrst'
      }
    },
    {
      id: 7,
      provider: 'Sumsub',
      date: '2024-01-18',
      status: 'pending',
      documentsShared: ['Social Security Card'],
      transactionHash: '0xefgh9012ijkl34mnop56qrst78uvwx90yz1234abcd56',
      blockchainDetails: {
        network: 'Aptos',
        module: 'KYC_Verification',
        timestamp: '2024-01-18T12:40:00Z',
        verificationNode: '0x5678mnop78qrst90uvwx12yz34abcd56efgh9012ijkl'
      }
    },
    {
      id: 8,
      provider: 'Onfido',
      date: '2024-01-27',
      status: 'completed',
      documentsShared: ['Passport', 'Utility Bill'],
      transactionHash: '0x9012qrst34uvwx56yz78abcd90efgh12ijkl34mnop56',
      blockchainDetails: {
        network: 'Aptos',
        module: 'KYC_Verification',
        timestamp: '2024-01-27T07:55:00Z',
        verificationNode: '0x7890abcd12efgh34ijkl56mnop78qrst90uvwx12yz'
      }
    }
  ];


  const handleViewDetails = (transaction: KYCCompletion) => {
    setSelectedTransaction(transaction);
    setIsDialogOpen(true);
  };

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'completed': return 'success';
      case 'pending': return 'secondary';
      case 'failed': return 'destructive';
      default: return 'outline';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="mr-2 h-4 w-4 text-green-500" />;
      case 'pending': return <Clock className="mr-2 h-4 w-4 text-yellow-500" />;
      case 'failed': return <XCircle className="mr-2 h-4 w-4 text-red-500" />;
      default: return null;
    }
  };

  const filteredTransactions = useMemo(() => {
    return kycCompletions.filter(completion =>
      statusFilters.includes(completion.status) &&
      (completion.provider.toLowerCase().includes(filter.toLowerCase()) ||
        completion.documentsShared.some(doc =>
          doc.toLowerCase().includes(filter.toLowerCase())
        ))
    );
  }, [kycCompletions, filter, statusFilters]);

  const handleDownloadDetails = () => {
    if (selectedTransaction) {
      const jsonContent = JSON.stringify(selectedTransaction, null, 2);
      const blob = new Blob([jsonContent], { type: 'application/json' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `kyc_transaction_${selectedTransaction.id}.json`;
      link.click();
    }
  };

  return (
    <CustomerLayout>
    <div className="container mx-auto p-6 max-w-6xl space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>KYC Integrated Platforms/Businesses</CardTitle>
          <CardDescription>
            Overview of KYC verification completions across different providers
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center space-x-2">
              <Input
                placeholder="Search providers or documents"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="w-64"
              />
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline">
                    <Filter className="mr-2 h-4 w-4" /> Filters
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-64">
                  <div className="grid gap-4">
                    <div className="space-y-2">
                      <h4 className="font-medium leading-none">Status Filters</h4>
                    </div>
                    <div className="grid gap-2">
                      {['completed', 'pending', 'failed'].map((status) => (
                        <div key={status} className="flex items-center space-x-2">
                          <Checkbox
                            id={status}
                            checked={statusFilters.includes(status)}
                            onCheckedChange={(checked) =>
                              setStatusFilters(prev =>
                                checked
                                  ? [...prev, status]
                                  : prev.filter(s => s !== status)
                              )
                            }
                          />
                          <Label htmlFor={status} className="capitalize">{status}</Label>
                        </div>
                      ))}
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
            <Button variant="outline" onClick={() => window.location.reload()}>
              <RotateCcw className="mr-2 h-4 w-4" /> Refresh
            </Button>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Provider</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Documents</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTransactions.map((completion) => (
                <TableRow key={completion.id}>
                  <TableCell>{completion.provider}</TableCell>
                  <TableCell>
                  {new Date(completion.date).toISOString()}

                  </TableCell>
                  <TableCell>
                    <Badge 
                    //@ts-ignore
                    variant={getStatusVariant(completion.status)}>
                      {getStatusIcon(completion.status)}
                      {completion.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <FileText className="mr-2 h-4 w-4 text-gray-500" />
                      {completion.documentsShared.join(', ')}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="outline"
                      size="sm"
                      //@ts-ignore
                      onClick={() => handleViewDetails(completion)}
                    >
                      <Eye className="mr-2 h-4 w-4" /> View Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {filteredTransactions.length === 0 && (
            <div className="text-center text-gray-500 py-4">
              No transactions found matching your filters
            </div>
          )}
        </CardContent>
      </Card>

      {/* Transaction Details Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[700px]">
          {selectedTransaction && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center">
                  {getStatusIcon(selectedTransaction.status)}
                  KYC Transaction Details
                </DialogTitle>
                <DialogDescription>
                  Detailed information for KYC verification by {selectedTransaction.provider}
                </DialogDescription>
              </DialogHeader>

              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="font-semibold">Provider:</Label>
                  <span className="col-span-3 font-medium">{selectedTransaction.provider}</span>

                  <Label className="font-semibold">Date:</Label>
                  <span className="col-span-3">
                    {new Date(selectedTransaction.date).toLocaleString()}
                  </span>

                  <Label className="font-semibold">Status:</Label>
                  <span className="col-span-3">
                    <Badge //@ts-ignore
                    variant={getStatusVariant(selectedTransaction.status)}>
                      {selectedTransaction.status}
                    </Badge>
                  </span>

                  <Label className="font-semibold">Documents:</Label>
                  <span className="col-span-3 flex items-center">
                    <FileText className="mr-2 h-4 w-4 text-gray-500" />
                    {selectedTransaction.documentsShared.join(', ')}
                  </span>

                  <Label className="font-semibold">Transaction Hash:</Label>
                  <span className="col-span-3 font-mono text-sm break-all">
                    {selectedTransaction.transactionHash}
                  </span>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2 flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-green-600" />
                    Blockchain Verification Details
                  </h4>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label className="font-semibold">Network:</Label>
                    <span className="col-span-3">
                      {selectedTransaction.blockchainDetails.network}
                    </span>

                    <Label className="font-semibold">Module:</Label>
                    <span className="col-span-3">
                      {selectedTransaction.blockchainDetails.module}
                    </span>

                    <Label className="font-semibold">Timestamp:</Label>
                    <span className="col-span-3">
                      {new Date(selectedTransaction.blockchainDetails.timestamp).toLocaleString()}
                    </span>

                    <Label className="font-semibold">Verification Node:</Label>
                    <span className="col-span-3 font-mono text-sm break-all">
                      {selectedTransaction.blockchainDetails.verificationNode}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-2">
                <DialogClose asChild>
                  <Button variant="outline">Close</Button>
                </DialogClose>
                <Button onClick={handleDownloadDetails}>
                  <Download className="mr-2 h-4 w-4" /> Download Details
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
    </CustomerLayout>
  );
};

export default KYCTransactionsPage;
