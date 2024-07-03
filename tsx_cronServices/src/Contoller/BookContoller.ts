import { Request, Response } from "express";
import { Book } from "../../server";

export const bookController = (req: Request, res: Response) => {
  console.log("Hello", req.params);
  const { id } = req.params;

  Book.findOne({ id: id })
    .then((data) => {
      console.log("response", JSON.stringify(data));
      res.send(data);
    })
    .catch((err) => res.status(500).send(err));
};
