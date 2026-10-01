import { MongoClient } from "mongodb";

const client = new MongoClient("mongodb://127.0.0.1:27017");

export const db = client.db("assignment7");

export const connectDB = async () => {
  try {
    await client.connect();
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log("Failed to connect to MongoDB", error);
  }
};
