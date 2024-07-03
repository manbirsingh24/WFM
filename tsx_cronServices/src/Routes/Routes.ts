import express from "express";
import { bookController } from "../Contoller/BookContoller";


let hasControls = express.Router();

hasControls.get("/:id", bookController);

export default hasControls;
