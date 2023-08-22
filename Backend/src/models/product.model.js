import mongoose, { Schema } from "mongoose";

const productSchema = mongoose.Schema(
  {
    productname: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String, //type: mongoose.Schema.Types.ObjectId, ref: 'Category',
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Product", productSchema);
