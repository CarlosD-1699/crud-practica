import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://carlosdbarbosa0716:merncrud-practica@cluster0.wzh2ymr.mongodb.net/"
    );
    console.log(">>> DB is connected");
  } catch (error) {
    console.log(error);
  }
};
