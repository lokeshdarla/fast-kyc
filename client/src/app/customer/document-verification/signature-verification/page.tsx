'use client'
import dotenv from 'dotenv';
import React, { useState } from 'react';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { CameraCapture } from '@/components/CameraCapture';
import { DocumentUpload } from '@/components/DocumentUpload';
import { CustomerLayout } from '@/components/CustomerLayout';
import { encryptFile } from "@/utils/encrypt";
import { useContext } from 'react';
import { useWallet } from '@aptos-labs/wallet-adapter-react';
import { StateContext } from '@/context/ContractContext';
import Cookies from "js-cookie";

dotenv.config();

const Page = () => {
  const [currentStepId, setCurrentStepId] = useState(1);
  const [uploadedFiles, setUploadedFiles] = useState<{ [key: string]: File }>({});
  const [capturedSelfie, setCapturedSelfie] = useState<Blob | null>(null);
  const { account } = useWallet();
  const { handleUploadDocument } = useContext<any>(StateContext);

  const handleFileUpload = (fileType: string, file: File) => {
    setUploadedFiles(prev => ({
      ...prev,
      [fileType]: file
    }));
  };

  const handleSelfieCapture = (imageBlob: Blob) => {
    setCapturedSelfie(imageBlob);
  };

  const submitDocuments = async () => {
    if (!uploadedFiles['signature-verification'] || !capturedSelfie) {
      console.error('signature-verification document or selfie is missing.');
      return;
    }

    try {
      const formData = new FormData();
    formData.append('docName', 'signature-verification');
    formData.append('image_file', uploadedFiles['signature-verification']);
    formData.append('webcam_image', new File([capturedSelfie], 'selfie.jpg', { type: 'image/jpg' }));


        const encryptedBlob = await encryptFile(uploadedFiles['signature-verification'], process.env.NEXT_PUBLIC_HASH_KEY as string);

        const formData2 = new FormData();
        formData2.append("file", encryptedBlob, "signature-verification_" + account?.address);

        const res = await axios.post(process.env.NEXT_PUBLIC_PINATA_UPLOAD_URL as string, formData2, {
          headers: {
            "pinata_api_key": process.env.NEXT_PUBLIC_PINATA_API_KEY,
            "pinata_secret_api_key": process.env.NEXT_PUBLIC_PINATA_SECRET_API_KEY,
          },
        });

        if (res.data.IpfsHash) {
          alert("File encrypted and uploaded to IPFS successfully!");
        }
    }
    catch (err) {
       console.error("Error uploading documents:", err);
    }
    setUploadedFiles({});
		setCapturedSelfie(null);
		setCurrentStepId(1);

      }


  return (
    <CustomerLayout>
      <div className="container mx-auto max-w-5xl px-4 py-6 space-y-6">
        <div className='grid md:grid-cols-2 gap-6 w-full'>
          <CameraCapture onCapture={handleSelfieCapture} />
          <DocumentUpload
            fileType='signature-verification'
            onFileUpload={(file) => handleFileUpload('signature-verification', file)}
          />
        </div>

        <div className="flex flex-col space-y-4">
          <div className="flex justify-between space-x-4">
            <Button onClick={submitDocuments}>Submit</Button>
          </div>
        </div>
      </div>
    </CustomerLayout>
  );
};

export default Page;
