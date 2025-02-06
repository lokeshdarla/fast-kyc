'use client'
import dotenv from 'dotenv';
import React, { useState } from 'react';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { CameraCapture } from '@/components/CameraCapture';
import { DocumentUpload } from '@/components/DocumentUpload';
import { CustomerLayout } from '@/components/CustomerLayout';
import { encryptFile } from "@/utils/encrypt";
import { useWallet } from '@aptos-labs/wallet-adapter-react';

dotenv.config();

const Page = () => {
  const [uploadedFiles, setUploadedFiles] = useState<{ [key: string]: File }>({});
  const [capturedSelfie, setCapturedSelfie] = useState<Blob | null>(null);
  const { account } = useWallet();


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
    if (!uploadedFiles['voterid'] || !capturedSelfie) {
      console.error('voterid or selfie is missing.');
      return;
    }

    const formData = new FormData();
    formData.append('docName', 'voterid');
    formData.append('image_file', uploadedFiles['voterid']);
    formData.append('webcam_image', new File([capturedSelfie], 'selfie.jpg', { type: 'image/jpg' }));
  
        const encryptedBlob = await encryptFile(uploadedFiles['voterid'], process.env.NEXT_PUBLIC_HASH_KEY as string);

        const formData2 = new FormData();
        formData2.append("file", encryptedBlob, "voterid_" + account?.address);

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

  return (
    <CustomerLayout>
      <div className="container mx-auto max-w-5xl px-4 py-6 space-y-6">
        <div className='grid md:grid-cols-2 gap-6 w-full'>
          <CameraCapture onCapture={handleSelfieCapture} />
          <DocumentUpload
            fileType='voterid'
            onFileUpload={(file) => handleFileUpload('voterid', file)}
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
