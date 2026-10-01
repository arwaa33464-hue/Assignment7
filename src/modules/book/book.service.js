import { db } from "../../DB/connection.db.js";

export const addBook = async (req, res) => {
  try {
    const result = await db.collection("books").insertOne(req.body);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addManyBooks = async (req, res) => {
  try {
    const result = await db.collection("books").insertMany(req.body);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateBookYear = async (req, res) => {
  try {
    const { title } = req.params;
    const result = await db
      .collection("books")
      .updateOne({ title: title }, { $set: { year: 2022 } });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const findBookByTitle = async (req, res) => {
  try {
    const { title } = req.query;
    const book = await db.collection("books").findOne({ title: title });
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const findBooksBetweenYears = async (req, res) => {
  try {
    const from = Number(req.query.from);
    const to = Number(req.query.to);
    const books = await db
      .collection("books")
      .find({ year: { $gte: from, $lte: to } })
      .toArray();
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const findBooksByGenre = async (req, res) => {
  try {
    const { genre } = req.query;
    const books = await db
      .collection("books")
      .find({ genres: genre })
      .toArray();
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const skipAndLimitBooks = async (req, res) => {
  try {
    const books = await db
      .collection("books")
      .find()
      .sort({ year: -1 })
      .skip(2)
      .limit(3)
      .toArray();
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const findBooksWithIntegerYear = async (req, res) => {
  try {
    const books = await db
      .collection("books")
      .find({ year: { $type: "int" } })
      .toArray();
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const excludeGenres = async (req, res) => {
  try {
    const books = await db
      .collection("books")
      .find({ genres: { $nin: ["Horror", "Science Fiction"] } })
      .toArray();
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteBooksBeforeYear = async (req, res) => {
  try {
    const year = Number(req.query.year);
    const result = await db
      .collection("books")
      .deleteMany({ year: { $lt: year } });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const aggregate1 = async (req, res) => {
  try {
    const books = await db
      .collection("books")
      .aggregate([
        { $match: { year: { $gt: 2000 } } },
        { $sort: { year: -1 } },
      ])
      .toArray();
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const aggregate2 = async (req, res) => {
  try {
    const books = await db
      .collection("books")
      .aggregate([
        { $match: { year: { $gt: 2000 } } },
        { $project: { _id: 0, title: 1, author: 1, year: 1 } },
      ])
      .toArray();
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const aggregate3 = async (req, res) => {
  try {
    const books = await db
      .collection("books")
      .aggregate([
        { $unwind: "$genres" },
        { $project: { _id: 0, title: 1, genres: 1 } },
      ])
      .toArray();
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const aggregate4 = async (req, res) => {
  try {
    const result = await db
      .collection("logs")
      .aggregate([
        {
          $lookup: {
            from: "books",
            localField: "book_id",
            foreignField: "_id",
            as: "book_details",
          },
        },
        {
          $project: {
            _id: 0,
            action: 1,
            "book_details.title": 1,
            "book_details.author": 1,
            "book_details.year": 1,
          },
        },
      ])
      .toArray();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
