// const password = process.env.REACT_APP_MONGODB_PASSWORD

// password: BWLIxhz7N3hmIk27
// mongodb+srv://tarripewe:<password>@cluster0.qwomjqx.mongodb.net/?retryWrites=true&w=majority
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");

require("dotenv").config();

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));

const port = process.env.PORT;
const MONGGODB_URL = process.env.REACT_APP_MONGODB_CONNECT;

mongoose
  .connect(MONGGODB_URL)
  .then(() => {
    app.listen(port, () => console.log(`Server running on port ${port}`));
  })
  .catch((error) => console.log(`${error} did not match`));
