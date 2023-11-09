var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const mongoose = require("mongoose");
var Product = require("./models/product");
var resourceRouter = require("./routes/resource");
var productsRouter = require('./routes/products');
async function recreateDB() {
  // Delete everything
  await Product.deleteMany();
  let product1 = new Product({
    product_type: "IPHONE 14",
    feature: "better camera",
    cost: 815.4,
  });

  let product2 = new Product({
    product_type: "Mac Book",
    feature: "retina display",
    cost: 913.5,
  });

  let product3 = new Product({
    product_type: "Google pixel",
    feature: "4k capable front camera",
    cost: 710.5,
  });



  product1
    .save()
    .then((doc) => {
      console.log("First object saved");
    })
    .catch((err) => {
      console.error(err);
    });

    product2
    .save()
    .then((doc) => {
      console.log("Second object saved");
    })
    .catch((err) => {
      console.error(err);
    });

    product3
    .save()
    .then((doc) => {
      console.log("Third object saved");
    })
    .catch((err) => {
      console.error(err);
    });




}

let reseed = true;
if (reseed) {
  recreateDB();
}

require("dotenv").config();
const connectionString = process.env.MONGO_CON;
mongoose
  .connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })

  .then(() => console.log("Connected to MongoDB"))

  .catch((err) => console.error("Error connecting to MongoDB: ", err));

var db = mongoose.connection;
//Bind connection to error event
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", function () {
  console.log("Connection to DB succeeded");
});

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var productRouter = require("./routes/product");
var boardRouter = require("./routes/board");
var chooseRouter = require("./routes/choose");

var app = express();
app.use(express.static("public"));

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/product", productRouter);
app.use("/board", boardRouter);
app.use("/choose", chooseRouter);
app.use("/resource",resourceRouter);
app.use("/products",productsRouter);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
