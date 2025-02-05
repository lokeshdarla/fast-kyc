'use client'
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

const BusinessRegistrationForm = () => {
  const gstData = {
    "stateJurisdictionCode": "AP114",
    "legalName": "WIREGUY ELECTRICALS PRIVATE LIMITED",
    "stateJurisdiction": "PENAMALURU",
    "taxType": "Regular",
    "gstNumber": "37AAECW0060B1ZT",
    "registrationDate": "28/01/2025",
    "constitutionOfBusiness": "Private Limited",
    "natureOfBusinessActivity": ["Wholesale Business"],
    "principalAddress": {
      "address": {
        "district": "NTR",
        "buildingNumber": "DNO 14-0132,ROAD NO3 ,",
        "location": "Vijayawada",
        "street": "TULASI NAGAR",
        "streetcd": "Andhra Pradesh",
        "pincode": "520007"
      }
    }
  };

  const [formData, setFormData] = useState({
    // GST Details
    gstNumber: gstData.gstNumber,
    legalName: gstData.legalName,
    tradeName: '',
    businessType: gstData.constitutionOfBusiness,
    registrationDate: gstData.registrationDate,
    businessNature: gstData.natureOfBusinessActivity[0],

    // Contact Details
    email: '',
    phone: '',

    // Address from GST
    buildingNumber: gstData.principalAddress.address.buildingNumber,
    street: gstData.principalAddress.address.street,
    location: gstData.principalAddress.address.location,
    district: gstData.principalAddress.address.district,
    state: gstData.principalAddress.address.streetcd,
    pincode: gstData.principalAddress.address.pincode,

    // KYC Requirements
    kycPreferences: {
      identityDocuments: false,
      addressProof: false,
      bankDetails: false,
      taxDocuments: false,
      businessProof: false,
      directorDetails: false
    }
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCheckboxChange = (field) => {
    setFormData(prev => ({
      ...prev,
      kycPreferences: {
        ...prev.kycPreferences,
        [field]: !prev.kycPreferences[field]
      }
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <form onSubmit={handleSubmit}>
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
              <div className="space-y-2">
                <Label htmlFor="gstNumber">GST Number</Label>
                <Input
                  id="gstNumber"
                  name="gstNumber"
                  value={formData.gstNumber}

                  className="bg-gray-50"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="registrationDate">GST Registration Date</Label>
                <Input
                  id="registrationDate"
                  name="registrationDate"
                  value={formData.registrationDate}

                  className="bg-gray-50"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="legalName">Legal Business Name</Label>
              <Input
                id="legalName"
                name="legalName"
                value={formData.legalName}

                className="bg-gray-50"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="businessType">Constitution of Business</Label>
                <Input
                  id="businessType"
                  name="businessType"
                  value={formData.businessType}

                  className="bg-gray-50"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="businessNature">Nature of Business</Label>
                <Input
                  id="businessNature"
                  name="businessNature"
                  value={formData.businessNature}

                  className="bg-gray-50"
                />
              </div>
            </div>
          </div>

          <Separator />

          {/* Contact Details Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact Details</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email">Business Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter business email"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Enter phone number"
                  required
                />
              </div>
            </div>
          </div>

          <Separator />

          {/* Address Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Registered Address</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="buildingNumber">Building Number</Label>
                <Input
                  id="buildingNumber"
                  name="buildingNumber"
                  value={formData.buildingNumber}

                  className="bg-gray-50"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="street">Street</Label>
                <Input
                  id="street"
                  name="street"
                  value={formData.street}

                  className="bg-gray-50"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  name="location"
                  value={formData.location}

                  className="bg-gray-50"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="district">District</Label>
                <Input
                  id="district"
                  name="district"
                  value={formData.district}

                  className="bg-gray-50"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="state">State</Label>
                <Input
                  id="state"
                  name="state"
                  value={formData.state}

                  className="bg-gray-50"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="pincode">Pincode</Label>
                <Input
                  id="pincode"
                  name="pincode"
                  value={formData.pincode}

                  className="bg-gray-50"
                />
              </div>
            </div>
          </div>

          <Separator />

          {/* KYC Preferences Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Required KYC Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="identityDocuments"
                  checked={formData.kycPreferences.identityDocuments}
                  onCheckedChange={() => handleCheckboxChange('identityDocuments')}
                />
                <Label htmlFor="identityDocuments">Identity Documents</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="addressProof"
                  checked={formData.kycPreferences.addressProof}
                  onCheckedChange={() => handleCheckboxChange('addressProof')}
                />
                <Label htmlFor="addressProof">Address Proof</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="bankDetails"
                  checked={formData.kycPreferences.bankDetails}
                  onCheckedChange={() => handleCheckboxChange('bankDetails')}
                />
                <Label htmlFor="bankDetails">Bank Details</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="taxDocuments"
                  checked={formData.kycPreferences.taxDocuments}
                  onCheckedChange={() => handleCheckboxChange('taxDocuments')}
                />
                <Label htmlFor="taxDocuments">Tax Documents</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="businessProof"
                  checked={formData.kycPreferences.businessProof}
                  onCheckedChange={() => handleCheckboxChange('businessProof')}
                />
                <Label htmlFor="businessProof">Business Proof</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="directorDetails"
                  checked={formData.kycPreferences.directorDetails}
                  onCheckedChange={() => handleCheckboxChange('directorDetails')}
                />
                <Label htmlFor="directorDetails">Director Details</Label>
              </div>
            </div>
          </div>
        </CardContent>

        <CardFooter>
          <Button type="submit" className="w-full">
            Complete Registration
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
};

export default BusinessRegistrationForm;
