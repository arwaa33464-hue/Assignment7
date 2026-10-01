import { connectDB } from "./DB/connection.db.js";
import collectionController from "./modules/collection/collection.controller.js";
import bookController from "./modules/book/book.controller.js";
import logController from "./modules/log/log.controller.js";

const bootstrap = async (app, express) => {
  app.use(express.json());

  await connectDB();

  app.use("/collection", collectionController);
  app.use("/books", bookController);
  app.use("/logs", logController);

  app.use((req, res) => {
    res.status(404).json({ message: "Route not found" });
  });
};

export default bootstrap;
