import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import router from "./route/router.js";
import bodyParser from "body-parser";
dotenv.config();

const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors());
app.use("/", router);
app.use("/", express.static('uploads'))


if (process.env.NODE_ENV === "production")
{
    app.use(express.static("client/build"));
}




mongoose.connect(process.env.url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("connected TO DB"))
    .catch(() => console.log("Not Connected to DB"))

app.listen(PORT, () => console.log("Node Started Server PORT: ", PORT));