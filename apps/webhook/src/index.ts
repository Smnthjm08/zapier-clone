import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("webhook api!");
});

app.post("/api/v1/hooks/:userId/:zapId", (req, res) => {
  try {
    const { userId, zapId } = req.params;
    const body = req.body;

    console.log("Received webhook for zap:", zapId);
    console.log("Body:", body);

    return res.status(200).json({ message: "Webhook received successfully" });
  } catch (error) {
    console.error("error at webhooks:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

app.listen(5004, () => {
  console.log("Server started on port 5004");
});
