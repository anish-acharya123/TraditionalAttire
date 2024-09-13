const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const bodyparser = require("body-parser");
const PORT = process.env.PORT || 2000;
const connectDb = require("./config/db");
// require("dotenv").config();

connectDb();

app.use(
  cors({
    origin: "http://localhost:5173", // Replace with your frontend URL
    credentials: true, // Allow cookies to be sent with requests
  })
);

app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("hello world");
});

app.use("/product", require("./Routes/productRoutes"));
app.use("/user", require("./Routes/userRoutes"));
app.use("/admin", require("./Routes/adminRoutes"));
app.use("/recommend", require("./Routes/recommendationRoutes"));

app.listen(PORT, () => {
  console.log(`server is running at port : ${PORT}`);
});
