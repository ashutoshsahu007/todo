import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const mongoURL = process.env.MONGO_URI;

mongoose.connect(mongoURL);

const db = mongoose.connection;

db.on("error", (err) => {
  console.error("MongoDB connection error:", err);
});

db.on("disconnected", () => {
  console.warn("MongoDB connection disconnected");
});

db.once("open", async () => {
  console.log("Connected to MongoDB successfully");
  await showCollections(); // only run when connection is ready
});

async function showCollections() {
  try {
    // ✅ Access the native MongoDB driver directly from Mongoose
    const collectionsCursor = mongoose.connection.db.listCollections();
    const collections = await collectionsCursor.toArray();

    console.log("Collections in todoapp DB:");
    collections.forEach((collection) => {
      console.log("- " + collection.name);
    });

    // await mongoose.disconnect();
  } catch (err) {
    console.error("Error listing collections:", err);
  }
}

export default db;
