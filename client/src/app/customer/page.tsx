import KYCDataCard from '@/components/KycDataCard'

import React from 'react'

const page = () => {
  const defaultData = {
    personalInfo: {
      name: "John Doe",
      dateOfBirth: "1990-05-15",
      gender: "Male",
      email: "john.doe@example.com",
      phone: "+91 9876543210",
      nationality: "Indian",
      maritalStatus: "Single",
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
    <div className='w-full max-w-screen-xl'>

      {/* <StepperExample /> */}
      <KYCDataCard userData={defaultData} />
    </div>
  )
}

export default page
