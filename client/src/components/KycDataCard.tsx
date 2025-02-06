import React from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from '@/components/ui/table';
import {
 Button
} from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  User,
  FileCheck,
  AlertTriangle,
  MapPin,
  Building2,
  FileText,
  Clock,
  ShieldCheck
} from 'lucide-react';
import Link from 'next/link';

// const StatusCard = ({ status, riskCategory }) => (
//   <Card className="w-full mb-6">
//     <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-gray-50">
//       <CardTitle className="text-xl font-bold flex items-center gap-2">
//         <ShieldCheck className="w-6 h-6" />
//         KYC Status
//       </CardTitle>
//       <div className="flex gap-2 items-center">
//         <Badge variant="outline" className="font-medium">
//           Risk: {riskCategory}
//         </Badge>
//         <Badge className={
//           status === 'verified' ? "bg-green-100 text-green-800" :
//             status === 'pending' ? "bg-yellow-100 text-yellow-800" :
//               "bg-red-100 text-red-800"
//         }>
//           {status === 'verified' && <FileCheck className="w-3 h-3 mr-1" />}
//           {status === 'pending' && <AlertTriangle className="w-3 h-3 mr-1" />}
//           {status === 'rejected' && <AlertTriangle className="w-3 h-3 mr-1" />}
//           {status.charAt(0).toUpperCase() + status.slice(1)}
//         </Badge>
//       </div>
//     </CardHeader>
//   </Card>
// );

// const PersonalInfoCard = ({ personalInfo }) => (
//   <Card className="w-full mb-6">
//     <CardHeader className="bg-gray-50">
//       <CardTitle className="text-lg font-medium flex items-center gap-2">
//         <User className="w-5 h-5" />
//         Personal Information
//       </CardTitle>
//     </CardHeader>
//     <CardContent className="pt-6">
//       <Table>
//         <TableBody>
//           <TableRow>
//             <TableCell className="font-medium w-1/4">Full Name</TableCell>
//             <TableCell>{personalInfo.name}</TableCell>
//             <TableCell className="font-medium w-1/4">Date of Birth</TableCell>
//             <TableCell>{new Date(personalInfo.dateOfBirth).toLocaleDateString()}</TableCell>
//           </TableRow>
//           <TableRow>
//             <TableCell className="font-medium">Gender</TableCell>
//             <TableCell>{personalInfo.gender}</TableCell>
//             <TableCell className="font-medium">Nationality</TableCell>
//             <TableCell>{personalInfo.nationality}</TableCell>
//           </TableRow>
//           <TableRow>
//             <TableCell className="font-medium">Email</TableCell>
//             <TableCell>{personalInfo.email}</TableCell>
//             <TableCell className="font-medium">Phone</TableCell>
//             <TableCell>{personalInfo.phone}</TableCell>
//           </TableRow>
//           <TableRow>
//             <TableCell className="font-medium">Occupation</TableCell>
//             <TableCell>{personalInfo.occupation}</TableCell>
//             <TableCell className="font-medium">Annual Income</TableCell>
//             <TableCell>{personalInfo.annualIncome}</TableCell>
//           </TableRow>
//         </TableBody>
//       </Table>
//     </CardContent>
//   </Card>
// );

// const AddressCard = ({ address, type, icon: Icon, title }) => (
//   <Card className="w-full mb-6">
//     <CardHeader className="bg-gray-50">
//       <CardTitle className="text-lg font-medium flex items-center gap-2">
//         <Icon className="w-5 h-5" />
//         {title}
//       </CardTitle>
//     </CardHeader>
//     <CardContent className="pt-6">
//       <Table>
//         <TableBody>
//           <TableRow>
//             <TableCell className="font-medium">Street</TableCell>
//             <TableCell>{address.street}</TableCell>
//           </TableRow>
//           <TableRow>
//             <TableCell className="font-medium">City</TableCell>
//             <TableCell>{address.city}</TableCell>
//           </TableRow>
//           <TableRow>
//             <TableCell className="font-medium">State</TableCell>
//             <TableCell>{address.state}</TableCell>
//           </TableRow>
//           <TableRow>
//             <TableCell className="font-medium">Pincode</TableCell>
//             <TableCell>{address.pincode}</TableCell>
//           </TableRow>
//           {type === 'current' && (
//             <TableRow>
//               <TableCell className="font-medium">Residence Type</TableCell>
//               <TableCell>{address.residenceType}</TableCell>
//             </TableRow>
//           )}
//         </TableBody>
//       </Table>
//     </CardContent>
//   </Card>
// );

const DocumentsCard = ({ documents }) => (
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
            <TableCell className="w-1/6">Status</TableCell>
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
                <Button className="bg-green-100 text-green-800">Verified</Button>
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
                <Link href="/customer/documents-verifications/pan">
                <Button className="bg-green-100 text-green-800">Verified</Button>
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
                <Link href="/customer/documents-verifications/passport">
                <Button className="bg-green-100 text-green-800">Verified</Button>
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
                <Link href="/customer/documents-verifications/voterid">
                <Button className="bg-green-100 text-green-800">Verified</Button>
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
                <Link href="/customer/documents-verifications/bank_passbook">
                <Button className="bg-green-100 text-green-800">Verified</Button>
                </Link>
              )}
            </TableCell>
          </TableRow>
         
       
        </TableBody>
      </Table>
    </CardContent>
  </Card>
);

// const VerificationHistoryCard = ({ history }) => (
//   <Card className="w-full mb-6">
//     <CardHeader className="bg-gray-50">
//       <CardTitle className="text-lg font-medium flex items-center gap-2">
//         <Clock className="w-5 h-5" />
//         Verification History
//       </CardTitle>
//     </CardHeader>
//     <CardContent className="pt-6">
//       <Table>
//         <TableBody>
//           <TableRow>
//             <TableCell className="font-medium w-1/4">Last Updated</TableCell>
//             <TableCell>{new Date(history.lastUpdated).toLocaleDateString()}</TableCell>
//             <TableCell className="font-medium w-1/4">Next Review Date</TableCell>
//             <TableCell>{new Date(history.nextReviewDate).toLocaleDateString()}</TableCell>
//           </TableRow>
//           <TableRow>
//             <TableCell className="font-medium">Risk Category</TableCell>
//             <TableCell>{history.riskCategory}</TableCell>
//             <TableCell className="font-medium">Remarks</TableCell>
//             <TableCell>{history.remarks}</TableCell>
//           </TableRow>
//         </TableBody>
//       </Table>
//     </CardContent>
//   </Card>
// );

const KYCDataCards = ({ userData }) => {
  const defaultData = {
    personalInfo: {
      name: "John Doe",
      dateOfBirth: "1990-05-15",
      gender: "Male",
      email: "john.doe@example.com",
      phone: "+91 9876543210",
      nationality: "Indian",
      occupation: "Software Engineer",
      annualIncome: "₹1,200,000"
    },
    address: {
      current: {
        street: "123 Main Street",
        city: "Bangalore",
        state: "Karnataka",
        pincode: "560001",
        country: "India",
        residenceType: "Rented",
        yearsAtAddress: 3
      },
      permanent: {
        street: "456 Park Avenue",
        city: "Mumbai",
        state: "Maharashtra",
        pincode: "400001",
        country: "India"
      }
    },
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
          type: "Voter ID",
          documentType: "Utility Bill",
          verified: true,
          uploadDate: "2024-01-15",
          verificationDate: "2024-01-16",
          verifiedBy: "KYC Officer",
          validUntil: "2025-01-15"
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

  const data = userData || defaultData;

  return (
    <div className="w-full space-y-6">
      {/* <StatusCard status={data.kycStatus} riskCategory={data.verificationHistory.riskCategory} /> */}
      {/* <PersonalInfoCard personalInfo={data.personalInfo} /> */}
      {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AddressCard
          address={data.address.current}
          type="current"
          icon={MapPin}
          title="Current Address"
        />
        <AddressCard
          address={data.address.permanent}
          type="permanent"
          icon={Building2}
          title="Permanent Address"
        />
      </div> */}
      <DocumentsCard documents={data.documents} />
      {/* <VerificationHistoryCard history={data.verificationHistory} /> */}
    </div>
  );
};

export default KYCDataCards;
