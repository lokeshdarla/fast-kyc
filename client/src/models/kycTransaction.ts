import mongoose, { Schema, Document, Model } from 'mongoose';

interface IKycTransaction extends Document {
  txn_hash: string;
  customer_address: string;
  organisation_address: string;
  date?: Date;
}

const KycTransactionSchema = new Schema<IKycTransaction>(
  {
    txn_hash: {
      type: String,
      required: true,
    },
    customer_address: {
      type: String,
      required: true,
    },
    organisation_address: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const KycTransactionModel: Model<IKycTransaction> =
  mongoose.models.KycTransaction ||
  mongoose.model<IKycTransaction>('KycTransaction', KycTransactionSchema);

export default KycTransactionModel;
