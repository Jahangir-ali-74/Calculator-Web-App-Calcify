const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const History = require("./models/History");

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URL)
.then(() => console.log("MongoDB Connected"))
.catch((err) => console.log(err));


// SAVE CALCULATION

app.post("/save", async (req, res) => {

    try {

        const newHistory = new History({

            expression: req.body.expression,

            result: req.body.result
        });

        await newHistory.save();

        res.json({
            message: "Saved Successfully"
        });

    } catch (error) {

        res.status(500).json(error);
    }
});


// GET HISTORY

app.get("/history", async (req, res) => {

    try {

        const history = await History.find()
        .sort({ createdAt: -1 });

        res.json(history);

    } catch (error) {

        res.status(500).json(error);
    }
});


// DELETE HISTORY

app.delete("/delete", async (req, res) => {

    try {

        await History.deleteMany({});

        res.json({
            message: "History Deleted Successfully"
        });

    } catch (error) {

        res.status(500).json(error);
    }
});


// SERVER

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {

    console.log(
        `Server Running on Port ${PORT}`
    );
});