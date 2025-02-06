'use client'
import React, { useState, useContext } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { BusinessLayout } from '@/components/BusinessLayout';
import { StateContext } from '@/context/ContractContext';
import axios from 'axios';

// Define proper types
interface Address {
  district: string;
  buildingNumber: string;
  location: string;
  street: string;
  streetcd: string;
  pincode: string;
}

interface GSTData {
  stateJurisdictionCode: string;
  legalName: string;
  stateJurisdiction: string;
  taxType: string;
  gstNumber: string;
  registrationDate: string;
  constitutionOfBusiness: string;
  natureOfBusinessActivity: string[];
  principalAddress: {
    address: Address;
  };
}

interface FormData {
  gstNumber: string;
  legalName: string;
  tradeName: string;
  businessType: string;
  registrationDate: string;
  businessNature: string;
  email: string;
  phone: string;
  buildingNumber: string;
  street: string;
  location: string;
  district: string;
  state: string;
  pincode: string;
  kycPreferences: {
    [key: string]: boolean;
  };
}

const KYC_OPTIONS = [
  { id: 'AADHAR', label: 'AADHAR' },
  { id: 'PAN', label: 'PAN' },
  { id: 'VOTER_ID', label: 'VOTER ID' },
  { id: 'PASSPORT', label: 'PASSPORT' },
  { id: 'BANK_DETAILS', label: 'BANK DETAILS' },
] as const;

const BusinessRegistrationForm = () => {
  const { handleRegisterOrganization } = useContext(StateContext);

  const gstData: GSTData = {
    stateJurisdictionCode: "AP114",
    legalName: "WIREGUY ELECTRICALS PRIVATE LIMITED",
    stateJurisdiction: "PENAMALURU",
    taxType: "Regular",
    gstNumber: "37AAECW0060B1ZT",
    registrationDate: "28/01/2025",
    constitutionOfBusiness: "Private Limited",
    natureOfBusinessActivity: ["Wholesale Business"],
    principalAddress: {
      address: {
        district: "NTR",
        buildingNumber: "DNO 14-0132,ROAD NO3 ,",
        location: "Vijayawada",
        street: "TULASI NAGAR",
        streetcd: "Andhra Pradesh",
        pincode: "520007"
      }
    }
  };

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedKycOptions, setSelectedKycOptions] = useState<string[]>([]);
  const [formData, setFormData] = useState<FormData>({
    gstNumber: gstData.gstNumber,
    legalName: gstData.legalName,
    tradeName: '',
    businessType: gstData.constitutionOfBusiness,
    registrationDate: gstData.registrationDate,
    businessNature: gstData.natureOfBusinessActivity[0],
    email: '',
    phone: '',
    buildingNumber: gstData.principalAddress.address.buildingNumber,
    street: gstData.principalAddress.address.street,
    location: gstData.principalAddress.address.location,
    district: gstData.principalAddress.address.district,
    state: gstData.principalAddress.address.streetcd,
    pincode: gstData.principalAddress.address.pincode,
    kycPreferences: KYC_OPTIONS.reduce((acc, option) => ({
      ...acc,
      [option.id]: false
    }), {})
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleKycChange = (optionId: string) => {
    setFormData(prev => ({
      ...prev,
      kycPreferences: {
        ...prev.kycPreferences,
        [optionId]: !prev.kycPreferences[optionId]
      }
    }));

    setSelectedKycOptions(prev =>
      prev.includes(optionId)
        ? prev.filter(item => item !== optionId)
        : [...prev, optionId]
    );
  };

  const validateGST = async (gstNumber: string) => {
    try {
      const response = await axios.get(
        `https://gst-insights-api.p.rapidapi.com/getGSTDetailsUsingGST/${gstNumber}`,
        {
          headers: {
            'x-rapidapi-host': 'gst-insights-api.p.rapidapi.com',
            'x-rapidapi-key': '3e588a55a8msh5e32064e5570b19p1f533djsn7e5f95add51d',
          }
        }
      );
      return response.data;
    } catch (error) {
      console.error('GST validation failed:', error);
      throw error;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Validate GST
      await validateGST(formData.gstNumber);

      // Prepare submission data
      const submissionData = {
        ...formData,
        selectedKycOptions
      };

      // Register organization
      //@ts-ignore
      await handleRegisterOrganization(
        formData.gstNumber,
        JSON.stringify(submissionData),
        selectedKycOptions
      );

      // Show success message or redirect
      console.log("Validate successfully");
    } catch (error) {
      console.error('Registration failed:', error);
      // Show error message to user
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderInputField = (
    label: string,
    name: keyof FormData,
    type: string = 'text',
    required: boolean = false,
    readOnly: boolean = false
  ) => (
    <div className="space-y-2">
      <Label htmlFor={name}>{label}</Label>
      <Input
        id={name}
        name={name}
        type={type}
        //@ts-ignore
        value={formData[name]}
        onChange={handleInputChange}
        required={required}
        className={readOnly ? "bg-gray-50" : ""}
        readOnly={readOnly}
      />
    </div>
  );

  return (
    <BusinessLayout>
      <form onSubmit={handleSubmit} className="mb-8">
        <Card className="w-full max-w-6xl mx-auto">
          <CardHeader>
            <CardTitle>Business Registration</CardTitle>
            <CardDescription>
              Verify your GST details and complete the registration process
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* GST Details Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">GST Details</h3>
              <div className="grid grid-cols-2 gap-4">
                {renderInputField('GST Number', 'gstNumber', 'text', true, true)}
                {renderInputField('GST Registration Date', 'registrationDate', 'text', true, true)}
              </div>
              {renderInputField('Legal Business Name', 'legalName', 'text', true, true)}
              <div className="grid grid-cols-2 gap-4">
                {renderInputField('Constitution of Business', 'businessType', 'text', true, true)}
                {renderInputField('Nature of Business', 'businessNature', 'text', true, true)}
              </div>
            </div>

            <Separator />

            {/* Contact Details Section */}

            <Separator />

            {/* Address Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Registered Address</h3>
              <div className="grid grid-cols-2 gap-4">
                {renderInputField('Building Number', 'buildingNumber', 'text', true, true)}
                {renderInputField('Street', 'street', 'text', true, true)}
              </div>
              <div className="grid grid-cols-2 gap-4">
                {renderInputField('Location', 'location', 'text', true, true)}
                {renderInputField('District', 'district', 'text', true, true)}
              </div>
              <div className="grid grid-cols-2 gap-4">
                {renderInputField('State', 'state', 'text', true, true)}
                {renderInputField('Pincode', 'pincode', 'text', true, true)}
              </div>
            </div>

            <Separator />

            {/* KYC Preferences Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Required KYC Information</h3>
              <div className="grid grid-cols-2 gap-4">
                {KYC_OPTIONS.map(option => (
                  <div key={option.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={option.id}
                      checked={formData.kycPreferences[option.id]}
                      onCheckedChange={() => handleKycChange(option.id)}
                    />
                    <Label htmlFor={option.id}>{option.label}</Label>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>

          <CardFooter>
            <Button
              type="submit"
              className="w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Processing...' : 'Complete Registration'}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </BusinessLayout>
  );
};

export default BusinessRegistrationForm;
