// server/index.js
require('dotenv').config();
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/api", (req, res) => {
  res.json({ message: "Hello from Express!" });
});
app.use('/auth', require('./routes/auth'));
app.use('/users', require('./routes/users'));
app.use('/posts', require('./routes/posts'));


app.listen(5000, () => console.log("Server running on port 5000"));


// app.use('/messages', require('./routes/messages'));
// const PORT = 3000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

