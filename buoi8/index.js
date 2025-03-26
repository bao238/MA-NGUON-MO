const express = require("express");
const path = require("path");

const rootRouter = require("./routes/root");
const userRouter = require("./routes/user");
const productRouter = require("./routes/product");
const connectMongo = require("./config/connectDB");


connectMongo().catch((err) => console.log(err));


const app = express();
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");


app.use(express.static(path.join(__dirname, "public")));


app.use(express.urlencoded({ extended: true }));


app.use("/", rootRouter);
app.use("/users", userRouter);
app.use("/products", productRouter);


const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server Started on http://localhost:${PORT}/products`);
});
