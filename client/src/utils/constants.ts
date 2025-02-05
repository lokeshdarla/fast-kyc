export interface Stepper {
  step_id: Number,
  step_label: String,
  step_file_detail: String,
  description: String,
  completed: Boolean
}

const steps: Stepper[] = [
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
];
