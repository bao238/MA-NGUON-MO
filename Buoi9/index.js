const express = require("express");

const rootRouter = require("./routes/root");
const userRouter = require("./routes/user");
const productRouter = require("./routes/product");
const connectMongo = require("./config/connectDB");

connectMongo().catch((err) => console.log(err));

const app = express();
app.set("views", "./views");
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use("/", rootRouter);
app.use("/users", userRouter);
app.use("/products", productRouter);

app.listen(3000, () => {
  console.log("Server Started!!!");
});
