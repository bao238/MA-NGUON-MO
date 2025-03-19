const express = require('express');
const rootRouter = require("./routes/root")
const userRouter = require("./routes/user")
const bookingRouter = require("./routes/booking")
const HomeController = require('./controllers/home_controller');

const app = express();
app.set('views', './views')
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.json())

app.use("/user", userRouter)
app.use("/", rootRouter)
app.use("/booking", bookingRouter)

app.use("/", HomeController.index);
app.get("/about", HomeController.about);

app.get("/", (req, res)=>{
    res.render("index", {user});
});

app.listen(3000, ()=>{
    console.log("Server Started!!!")
})