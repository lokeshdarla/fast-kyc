'use client'
import React, { useState } from 'react';
import { CustomerLayout } from '@/components/CustomerLayout';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableRow, TableCell } from '@/components/ui/table';
import { FileText, CheckCircle, XCircle, ExternalLink } from 'lucide-react';
import Link from 'next/link';

type DocumentInfo = {
  number?: string;
  verified: boolean;
  uploadDate?: string;
  verificationDate?: string;
  verifiedBy?: string;
  txHash?: string;
};

type Documents = {
  [key: string]: DocumentInfo;
};

type DocumentsProps = {
  documents: Documents;
  verifiedSet: Set<string>;
  explorerUrl?: string;
};

const DocumentDashboard = () => {
  const [verified] = useState<Set<string>>(new Set());

  const defaultData = {
    documents: {
      aadhar: {
        verified: false
      },
      pan: {
        verified: false
      },
      passport: {
        verified: false
      },
      voterId: {
        verified: false
      },
      bankPassbook: {
        verified: false
      }
    }
  };

  const APTOS_EXPLORER_URL = "https://explorer.aptoslabs.com/txn";

  return (
    <CustomerLayout>
      <div className="w-full max-w-screen-xl">
        <DocumentsCard
          documents={defaultData.documents}
          verifiedSet={verified}
          explorerUrl={APTOS_EXPLORER_URL}
        />
      </div>
    </CustomerLayout>
  );
};

const DocumentsCard = ({ documents, verifiedSet, explorerUrl }: DocumentsProps) => {
  const documentTypes = [
    {
      name: 'Aadhaar Card',
      key: 'aadhar',
      path: '/customer/document-verification/aadhar-verification'
    },
    {
      name: 'PAN Card',
      key: 'pan',
      path: '/customer/document-verification/pan'
    },
    {
      name: 'Passport',
      key: 'passport',
      path: '/customer/document-verification/passport'
    },
    {
      name: 'Voter ID',
      key: 'voterId',
      path: '/customer/document-verification/voterid'
    },
    {
      name: 'Bank Passbook',
      key: 'bankPassbook',
      path: '/customer/document-verification/bank_passbook'
    }
  ];

  return (
    <Card className="w-full mb-6">
      <CardHeader className="bg-gray-50">
        <CardTitle className="text-lg font-medium flex items-center gap-2">
          <FileText className="w-5 h-5" />
          Document Information
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <Table>
          <TableBody>
            <TableRow className="bg-gray-50">
              <TableCell className="font-medium">Document</TableCell>
              <TableCell>Number</TableCell>
              <TableCell>Upload Date</TableCell>
              <TableCell>Verification Date</TableCell>
              <TableCell>Verified By</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>

            {documentTypes.map((doc) => {
              const documentInfo = documents[doc.key] || {};
              const isVerified = documentInfo.verified || verifiedSet.has(doc.key.toUpperCase());

              return (
                <TableRow key={doc.key}>
                  <TableCell className="font-medium">{doc.name}</TableCell>
                  <TableCell>{documentInfo.number || '---'}</TableCell>
                  <TableCell>{documentInfo.uploadDate || '---'}</TableCell>
                  <TableCell>{documentInfo.verificationDate || '---'}</TableCell>
                  <TableCell>{documentInfo.verifiedBy || '---'}</TableCell>
                  <TableCell>
                    {isVerified ? (
                      <div className="flex items-center text-green-600">
                        <CheckCircle className="w-4 h-4 mr-1" />
                        Verified
                      </div>
                    ) : (
                      <div className="flex items-center text-gray-500">
                        <XCircle className="w-4 h-4 mr-1" />
                        Pending
                      </div>
                    )}
                  </TableCell>
                  <TableCell>
                    {isVerified ? (
                      documentInfo.txHash && (
                        <Link
                          href={`${explorerUrl}/${documentInfo.txHash}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-blue-600 hover:text-blue-800"
                          >
                            <ExternalLink className="w-4 h-4 mr-1" />
                            View on Explorer
                          </Button>
                        </Link>
                      )
                    ) : (
                      <Link href={doc.path}>
                        <Button variant="default">
                          Upload
                        </Button>
                      </Link>
                    )}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default DocumentDashboard;
