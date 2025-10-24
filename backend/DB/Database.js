import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const db = "mongodb://localhost:27017/expense";
    
    console.log("Connecting to MongoDB at:", db); // DEBUG
    const { connection } = await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB Connected to ${connection.host}`);
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  }
};
