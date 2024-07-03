import express, { Request, Response } from "express";
import mongoose, { Schema, Document, ConnectOptions } from "mongoose";
import hasControls from "./src/Routes/Routes";

const app = express();
app.use(express.json());
app.use("/books", hasControls);


mongoose
  .connect("mongodb://localhost:27017/bookstore", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  } as ConnectOptions)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

// Define the interface for the schema
interface IBook extends Document {
  title: string;
  page: number;
  id: number;
}

// Create the schema
const bookSchema: Schema = new Schema({
  title: { type: String, required: true },
  page: { type: Number, required: true },
  id: { type: Number, required: true },
});

export const Book = mongoose.model<IBook>("newbooks", bookSchema);

// POST
app.post("/post", (req: Request, res: Response) => {
  console.log("inside post");

  const data = new Book({
    title: req.body.title,
    page: req.body.page,
    id: req.body.id,
  });

  data
    .save()
    .then((val) => res.json(val))
    .catch((err) => res.status(500).send(err));
});

// PUT
// app.put("/update/:id", (req: Request, res: Response) => {
//   Book.findOneAndUpdate(
//     { id: req.params.id },
//     { $set: { title: req.body.title, page: req.body.page } },
//     { new: true }
//   )
//     .then((data) => res.send(data))
//     .catch((err) => res.status(500).send(err));
// });

// FETCH
// app.get("/fetch/:id", (req: Request, res: Response) => {
//   Book.findOne({ id: req.params.id })
//     .then((data) => res.send(data))
//     .catch((err) => res.status(500).send(err));
// });

// // DELETE
// app.delete("/delete/:id", (req: Request, res: Response) => {
//   Book.findOneAndDelete({ id: req.params.id })
//     .then((data) => res.send(data))
//     .catch((err) => res.status(500).send(err));
// });

app.listen(5002, () => {
  console.log("on port 4002");
});


export default app;
