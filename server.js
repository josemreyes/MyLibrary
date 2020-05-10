if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const expressLayouts = require("express-ejs-layouts");
const path = require("path");

const indexRouter = require("./routes/index");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
app.set("layout", "layouts/layout");
app.use(expressLayouts);
app.use(express.static("public"));

const mongoose = require("mongoose");
//DB config
const dbPath = process.env.DATABASE_URL;
//global flags sets for eliminate mongo flags
mongoose.set("useNewUrlParser", true);
mongoose.set("useUnifiedTopology", true);
mongoose.set("useCreateIndex", true);

//connect to mongo
mongoose.connect(dbPath);

const db = mongoose.connection;

db.on("error", (error) => console.error(error));
db.once("open", (error) => console.log("Connected to Moongose"));

app.use("/", indexRouter);

app.listen(process.env.PORT || 3000, () => {
  console.log("App listening on port 3000!");
});
