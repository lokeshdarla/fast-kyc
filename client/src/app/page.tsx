import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Clock, Building, User } from 'lucide-react';
import HomeNavbar from '@/components/HomeNavBar';
const LandingPage = () => {
  return (
    <div className="min-h-screen">
      <HomeNavbar />
      
      {/* Hero Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-6">
            One KYC, Multiple Services
          </h1>
          <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
            Verify once, use everywhere. FastKYC simplifies identity verification for both customers and businesses.
          </p>
          <div className="flex justify-center gap-6">
            <Button className="bg-blue-600 hover:bg-blue-700" size="lg">
              <User className="mr-2 h-4 w-4" />
              For Customers
            </Button>
            <Button variant="outline" size="lg">
              <Building className="mr-2 h-4 w-4" />
              For Businesses
            </Button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-10">
            <div className="text-center p-6">
              <Shield className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">Secure Verification</h3>
              <p className="text-gray-600">One-time verification process with bank-grade security standards</p>
            </div>
            <div className="text-center p-6">
              <Clock className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">Save Time</h3>
              <p className="text-gray-600">No more repetitive KYC submissions across different services</p>
            </div>
            <div className="text-center p-6">
              <Building className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">Business Ready</h3>
              <p className="text-gray-600">Instant access to verified customer identities</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Simplify KYC?</h2>
          <p className="mb-8 text-lg">Join thousands of users who have already simplified their verification process</p>
          <Button variant="secondary" size="lg">
            Get Started Now
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;