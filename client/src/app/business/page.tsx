'use client'
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Building2, Mail, Phone, MapPin, FileCheck, Clock } from 'lucide-react';
import { BusinessLayout } from '@/components/BusinessLayout';

const BusinessProfile = () => {

  // Business Details
  const business = {
    name: "Upstox",
    gstNumber: "37AAECW0060B113",
    type: "Private Limited Company",
    email: "contact@Upstox.com",
    phone: "+91 98765 43210",
    address: {
      building: "DNO 14-0132, ROAD NO 3",
      area: "TULASI NAGAR",
      city: "Vijayawada",
      state: "Andhra Pradesh",
      pincode: "520007"
    },
    status: "Active",
    registeredOn: "28 Jan 2025"
  };

  // KYC Requirements (dummy data)
  const kycRequirements = [
    {
      type: "Identity Proof",
      documents: ["PAN Card", "Aadhaar Card"],
      status: "Required",
      purpose: "To verify cutomer identity"
    },
    {
      type: "Address Proof",
      documents: ["Electricity Bill", "Rent Agreement"],
      status: "Required",
      purpose: "To verify customer location"
    },
  ];

  return (
    <BusinessLayout>
      <div className="max-w-5xl mx-auto p-4 space-y-6">
        {/* Quick Info Banner */}
        <Card className="bg-white">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h1 className="text-2xl font-bold">{business.name}</h1>
                <div className="flex items-center gap-2 mt-2">
                  <Badge variant="outline">{business.type}</Badge>
                  <Badge className="bg-green-100 text-green-800">
                    {business.status}
                  </Badge>
                </div>
              </div>
              <div className="flex flex-col items-start md:items-end">
                <p className="text-sm text-gray-500">GST Number</p>
                <p className="font-mono font-medium">{business.gstNumber}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Contact Details */}
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <Mail className="text-gray-500" size={20} />
                <div>
                  <p className="text-gray-500 text-sm">Email</p>
                  <p>{business.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="text-gray-500" size={20} />
                <div>
                  <p className="text-gray-500 text-sm">Phone</p>
                  <p>{business.phone}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="text-gray-500" size={20} />
                <div>
                  <p className="text-gray-500 text-sm">Registered On</p>
                  <p>{business.registeredOn}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Address */}
          <Card>
            <CardHeader>
              <CardTitle>Business Address</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-start gap-3">
                <MapPin className="text-gray-500 mt-1" size={20} />
                <div>
                  <p>{business.address.building}</p>
                  <p>{business.address.area}</p>
                  <p>{business.address.city}, {business.address.state}</p>
                  <p>{business.address.pincode}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* KYC Requirements */}
        <Card>
          <CardHeader>
            <CardTitle>Required Documents</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              {kycRequirements.map((kyc, index) => (
                <div key={index} className="border rounded-lg p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">{kyc.type}</h3>
                    <Badge
                      variant={kyc.status === "Required" ? "destructive" : "secondary"}
                    >
                      {kyc.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-500">{kyc.purpose}</p>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Documents needed:</p>
                    <ul className="text-sm text-gray-600 list-disc list-inside">
                      {kyc.documents.map((doc, i) => (
                        <li key={i}>{doc}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </BusinessLayout>
  );
};

export default BusinessProfile;
