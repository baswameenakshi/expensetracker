const express = require("express");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const Router = require("./routers");

const app = express();

// Define your MongoDB connection URI directly here
const dbURI = "mongodb+srv://baswameenakshi:1234@cluster0.bn7hunf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const port = process.env.PORT || 3000;

app.use(express.static("public"));
app.use(express.json());
app.use(cookieParser());
app.use(Router);

mongoose
  .connect(dbURI)
  .then(() => {
    app.listen(port);
    console.log("Connected to MongoDB and listening at port", port);
  })
  .catch((err) => console.error("Error connecting to MongoDB:", err));

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  const path = require("path");
  app.get("*", function (req, res) {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}
