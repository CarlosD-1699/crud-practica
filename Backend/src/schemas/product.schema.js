import { z } from "zod";

export const createProductSchema = z.object({
  productname: z.string({ required_error: "Product name is required" }),
  description: z.string({ required_error: "Description must be a string" }),
  category: z.string({ required_error: "Category is required" }),
  price: z.string({ required_error: " Price is required" }),
});
