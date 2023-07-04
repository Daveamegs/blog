import express from "express";
import mongoose from 'mongoose'
import router from "./routes/user-routes";
import blogRouter from "./routes/blog-routes";
import dotenv from "dotenv"

dotenv.config()

const app = express();
app.use(express.json())

const PORT = process.env.PORT || 3001;
const DB_NAME = process.env.DB_NAME;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_URL = process.env.DB_URL;
const DB_TYPE = process.env.DB_TYPE;


app.use("/users", router)
app.use("/blog", blogRouter)

mongoose.connect(`${DB_TYPE}+srv://${DB_NAME}:${DB_PASSWORD}@${DB_URL}`)
.then(() => app.listen(PORT))
.then(console.log(`Connected to Mongodb and Listening on ${PORT}`))
.catch(err => console.log(err.message));
