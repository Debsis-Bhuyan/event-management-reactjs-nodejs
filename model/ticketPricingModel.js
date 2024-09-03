import mongoose from "mongoose";

const Schema = mongoose.Schema;

const TicketPricingSchema = new Schema({
  basicPrice: {
    type: Number,
    required: true,
  },
  standardPrice: {
    type: Number,
    required: true,
  },
  premiumPrice: {
    type: Number,
    required: true,
  },
});

const TicketPricing = mongoose.model("TicketPricing", TicketPricingSchema);

export default TicketPricing;
