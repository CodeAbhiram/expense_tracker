import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    // Use your environment variable for the MongoDB URI
    const db = process.env.MONGO_URL;

    if (!db) {
      throw new Error("MONGO_URI is not defined in environment variables");
    }

    console.log("Connecting to MongoDB at:", db); // DEBUG

    const { connection } = await mongoose.connect(db);

    console.log(`✅ MongoDB Connected to ${connection.host}`);
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error.message);
    process.exit(1);
  }
};
