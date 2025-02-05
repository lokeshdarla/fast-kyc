'use client'
import React, { useState } from 'react';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Stepper, StepperComponent } from '@/components/Stepper';
import { CameraCapture } from '@/components/CameraCapture';
import { DocumentUpload } from '@/components/DocumentUpload';
import { CustomerLayout } from '@/components/CustomerLayout';

const Page = () => {
  const [currentStepId, setCurrentStepId] = useState(1);
  const [uploadedFiles, setUploadedFiles] = useState<{ [key: string]: File }>({});
  const [capturedSelfie, setCapturedSelfie] = useState<Blob | null>(null);

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
    console.log("Here");
    if (!uploadedFiles['aadhar'] || !capturedSelfie) {
      console.error('Aadhaar document or selfie is missing.');
      return;
    }

    const formData = new FormData();
    formData.append('docName', 'Aadhaar');
    formData.append('image_file', uploadedFiles['aadhar']);
    formData.append('webcam_image', new File([capturedSelfie], 'selfie.jpg', { type: 'image/jpg' }));

    try {
      const response = await axios.post(
        'https://8d4e-2401-4900-6572-217e-69a4-f6c9-dc8-6519.ngrok-free.app/api/getAadhaarInfo/',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      );

      if (response.status === 200) {
        console.log('Documents uploaded successfully:', response.data);
      } else {
        console.error('Upload failed');
      }
    } catch (error: any) {
      console.error('Error uploading documents:', error.response?.data || error.message);
    }
  };

  return (
    <CustomerLayout>
      <div className="container mx-auto max-w-5xl px-4 py-6 space-y-6">
        <div className='grid md:grid-cols-2 gap-6 w-full'>
          <CameraCapture onCapture={handleSelfieCapture} />
          <DocumentUpload
            fileType='aadhar'
            onFileUpload={(file) => handleFileUpload('aadhar', file)}
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
