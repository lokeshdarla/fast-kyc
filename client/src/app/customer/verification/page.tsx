'use client'
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Stepper, StepperComponent } from '@/components/Stepper';
import { CameraCapture } from '@/components/CameraCapture';
import { DocumentUpload } from '@/components/DocumentUpload';
import { CustomerLayout } from '@/components/CustomerLayout';

const Page = () => {
  const [steps, setSteps] = useState<Stepper[]>([
    {
      step_id: 1,
      step_label: "Aadhaar Verification",
      step_file_detail: "aadhaar",
      description: "Upload Aadhaar card for identity verification.",
      completed: false
    },
    {
      step_id: 2,
      step_label: "PAN Card Verification",
      step_file_detail: "pan_card",
      description: "Provide PAN card details for tax identification.",
      completed: false
    },
    {
      step_id: 3,
      step_label: "Address Proof",
      step_file_detail: "address_proof",
      description: "Upload any valid address proof (e.g., electricity bill, passport).",
      completed: false
    },
    {
      step_id: 4,
      step_label: "Bank Details",
      step_file_detail: "bank_details",
      description: "Provide bank account details for verification.",
      completed: false
    },
    {
      step_id: 5,
      step_label: "Selfie Verification",
      step_file_detail: "selfie",
      description: "Take a live selfie for identity confirmation.",
      completed: false
    },
    {
      step_id: 6,
      step_label: "E-Signature",
      step_file_detail: "esign",
      description: "Complete digital signature to finalize KYC.",
      completed: false
    }
  ]);

  const [currentStepId, setCurrentStepId] = useState(1);
  const [uploadedFiles, setUploadedFiles] = useState<{ [key: string]: File }>({});
  const [capturedSelfie, setCapturedSelfie] = useState<Blob | null>(null);

  const handleStepChange = (stepId: number) => {
    // Update current step
    setCurrentStepId(stepId);

    // Update completed status for previous steps
    setSteps(prevSteps =>
      prevSteps.map(step => ({
        ...step,
        completed: step.step_id < stepId
      }))
    );
  };

  const handleFileUpload = (fileType: string, file: File) => {
    setUploadedFiles(prev => ({
      ...prev,
      [fileType]: file
    }));
  };

  const handleSelfieCapture = (imageBlob: Blob) => {
    setCapturedSelfie(imageBlob);
  };

  const handleNextStep = () => {
    if (currentStepId < steps.length) {
      handleStepChange(currentStepId + 1);
    }
  };

  const handlePreviousStep = () => {
    if (currentStepId > 1) {
      handleStepChange(currentStepId - 1);
    }
  };

  const submitDocuments = async () => {
    const formData = new FormData();

    // Add files to form data
    Object.entries(uploadedFiles).forEach(([key, file]) => {
      formData.append(key, file);
    });

    // Add selfie if captured
    if (capturedSelfie) {
      formData.append('selfie', capturedSelfie, 'selfie.jpg');
    }

    try {
      const response = await fetch('/api/kyc/upload', {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        console.log('Documents uploaded successfully');
      } else {
        console.error('Upload failed');
      }
    } catch (error) {
      console.error('Error uploading documents:', error);
    }
  };

  return (
    <CustomerLayout>
    <div className="container mx-auto max-w-5xl px-4 py-6 space-y-6">
      <StepperComponent
        steps={steps}
        currentStepId={currentStepId}
        onStepChange={handleStepChange}
      />

      <div className='grid md:grid-cols-2 gap-6 w-full'>
        <CameraCapture
          onCapture={handleSelfieCapture}
        />
        <DocumentUpload
          fileType={steps[currentStepId - 1].step_label}
          onFileUpload={(file) => handleFileUpload('address_proof', file)}
        />
      </div>

      <div className="flex flex-col space-y-4">
        <div className="flex justify-between space-x-4">
          <Button
            variant="outline"
            onClick={handlePreviousStep}
            disabled={currentStepId === 1}
            className="flex-1"
          >
            Previous
          </Button>
          <Button
            onClick={handleNextStep}
            disabled={currentStepId === steps.length}
            className="flex-1"
          >
            Next
          </Button>
        </div>

        {currentStepId === steps.length && (
          <Button
            onClick={submitDocuments}
            className="w-full"
          >
            Submit KYC Documents
          </Button>
        )}
      </div>
    </div>
    </CustomerLayout>
  );
};

export default Page;
