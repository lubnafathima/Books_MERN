import express from "express";
import connectDB from "./config/db.js";

const app = express();
connectDB();

app.get("/", (req,res) => {
    res.send("WORKING");
});

const PORT = process.env.PORT || 8082;
app.listen(PORT, () => {
    console.log(`Server listening at http://localhost:${PORT}`);
});