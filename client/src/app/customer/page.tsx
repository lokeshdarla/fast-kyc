import { CustomerLayout } from '@/components/CustomerLayout';
import KYCDataCard from '@/components/KycDataCard'
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { TableBody, Table, TableRow, TableCell } from '@/components/ui/table';
import { FileText } from 'lucide-react';
import Link from 'next/link';

import React from 'react'

const page = () => {
  const defaultData = {
    kycStatus: "verified",
    documents: {
      aadhar: {
        number: "XXXX-XXXX-1234",
        verified: true,
        uploadDate: "2024-01-15",
        verificationDate: "2024-01-16",
        verifiedBy: "KYC Officer"
      },
      pan: {
        number: "ABCDE1234F",
        verified: true,
        uploadDate: "2024-01-15",
        verificationDate: "2024-01-16",
        verifiedBy: "KYC Officer"
      },
      additionalDocs: [
        {
          type: "Address Proof",
          documentType: "Utility Bill",
          verified: true,
          uploadDate: "2024-01-15",
          verificationDate: "2024-01-16",
          verifiedBy: "KYC Officer",
          validUntil: "2025-01-15"
        },
        {
          type: "Income Proof",
          documentType: "Salary Slip",
          verified: true,
          uploadDate: "2024-01-15",
          verificationDate: "2024-01-16",
          verifiedBy: "KYC Officer"
        }
      ]
    },
    verificationHistory: {
      lastUpdated: "2024-01-16",
      nextReviewDate: "2025-01-16",
      riskCategory: "Low",
      remarks: "All documents verified successfully"
    }
  };
  return (
    <CustomerLayout>
      <div className='w-full max-w-screen-xl'>


        {/* <KYCDataCard userData={defaultData} /> */}
        <DocumentsCard documents={defaultData.documents} />
      </div>
    </CustomerLayout>

  )
}

export default page
// @ts-ignore
export const DocumentsCard = ({ documents }) => (
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
          <TableRow>
            <TableCell className="font-medium w-1/6">Document</TableCell>
            <TableCell className="w-1/6">Number</TableCell>
            <TableCell className="w-1/6">Upload Date</TableCell>
            <TableCell className="w-1/6">Verification Date</TableCell>
            <TableCell className="w-1/6">Verified By</TableCell>
            <TableCell className="w-1/6">Upload</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Aadhaar Card</TableCell>
            <TableCell>---</TableCell>
            <TableCell>----</TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell>
              {documents.aadhar.verified && (
                <Link href="/customer/aadhar-verification">
                  <Button >Upload here</Button>
                </Link>
              )}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">PAN Card</TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell>
              {documents.pan.verified && (
                <Link href="/customer/document-verifications/pan">
                  <Button >Upload here</Button>
                </Link>
              )}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Passport</TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell>
              {documents.pan.verified && (
                <Link href="/customer/document-verifications/passport">
                  <Button >Upload here</Button>
                </Link>
              )}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Voter ID</TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell>
              {documents.pan.verified && (
                <Link href="/customer/document-verifications/voterid">
                  <Button>Upload here</Button>
                </Link>
              )}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Bank Passbook</TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell>
              {documents.pan.verified && (
                <Link href="/customer/document-verifications/bank_passbook">
                  <Button >Upload here</Button>
                </Link>
              )}
            </TableCell>
          </TableRow>


        </TableBody>
      </Table>
    </CardContent>
  </Card>
);
