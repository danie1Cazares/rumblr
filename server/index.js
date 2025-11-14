// server/index.js
import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/api", (req, res) => {
  res.json({ message: "Hello from Express!" });
});

app.listen(5000, () => console.log("Server running on port 5000"));
