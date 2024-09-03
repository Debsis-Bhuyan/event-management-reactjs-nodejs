import mongoose from "mongoose";

const Schema = mongoose.Schema;

const PaymentSchema = new Schema({
  paymentType: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  paymentStatus: {
    type: String,
    required: true,
  },
});

const Payment = mongoose.model('Payment', PaymentSchema);

export default Payment;
