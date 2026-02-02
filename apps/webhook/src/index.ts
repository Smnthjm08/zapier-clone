import express from "express";

const app = express();

app.get("/", (req, res) => {
    res.send("webhook root page!");
});

app.listen(5004, () => {
    console.log("Server started on port 5004");
});