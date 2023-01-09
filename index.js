const express = require("express");
const cors = require("cors");
require("dotenv").config();
const cart = require("./routes/cart");


const app = express();
const connectToDB = require("./db/db");

connectToDB(process.env.DB_URL);

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Data fetched successfully.",
    response: "Welcome to the con10 API!",
  });
});

app.use("/cart", cart);

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Listening on port ${port}`));
