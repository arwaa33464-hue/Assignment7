import { db } from "../../DB/connection.db.js";

export const createBooksCollection = async (req, res) => {
  try {
    await db.createCollection("books", {
      validator: {
        $jsonSchema: {
          bsonType: "object",
          required: ["title"],
          properties: {
            title: {
              bsonType: "string",
              minLength: 1,
            },
          },
        },
      },
    });
    res.status(201).json({ ok: 1 });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createAuthorsCollection = async (req, res) => {
  try {
    const result = await db.collection("authors").insertOne(req.body);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createLogsCollection = async (req, res) => {
  try {
    await db.createCollection("logs", {
      capped: true,
      size: 1024 * 1024,
    });
    res.status(201).json({ ok: 1 });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createBooksIndex = async (req, res) => {
  try {
    const result = await db.collection("books").createIndex({ title: 1 });
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
