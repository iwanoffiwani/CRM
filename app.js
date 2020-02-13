const compression = require("compression");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const passport = require("passport");

const authRouters = require("./routes/auth");
const fieldRouters = require("./routes/field");
const craterRouters = require("./routes/status");
const requestRouters = require("./routes/order");

const keys = require("./config/keys");

mongoose
  .connect(keys.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB has been connected"))
  .catch(error => console.log(error));

mongoose.set("useCreateIndex", true);

mongoose.set("useFindAndModify", false);

app.use(passport.initialize());
require("./middleware/passport")(passport);

app.use(morgan("dev"));

app.use(compression());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors());

app.use("/api/auth", authRouters);
app.use("/api/fields", fieldRouters);
app.use("/api/statuses", craterRouters);
app.use("/api/orders", requestRouters);

module.exports = app;
