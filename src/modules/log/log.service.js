import { ObjectId } from "mongodb";
import { db } from "../../DB/connection.db.js";

export const addLog = async (req, res) => {
  try {
    const { book_id, action } = req.body;
    const result = await db.collection("logs").insertOne({
      book_id: new ObjectId(book_id),
      action,
    });
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
