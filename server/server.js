import express from "express";
import cors from "cors";
import dotenv from 'dotenv'
import router from "./routes/card.route.js";
import connection from "./db/connection.js";

dotenv.config();
connection();
const PORT = process.env.PORT || 8000
const app = express();


app.use(cors());
app.use(express.json());

app.use("/api/v1/card",router);

app.listen(PORT, () => {
    console.log("App now listens on port " + PORT);
});

