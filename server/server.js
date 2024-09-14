const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const bodyparser = require("body-parser");
const PORT = process.env.PORT || 2000;
const connectDb = require("./config/db");
const { default: axios } = require("axios");
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
  res.json({ message: "hello world" });
});

app.post("/payment/khalti", async (req, res) => {
  try {
    const payload = req.body;

    console.log({ payload });

    const khaltiResponse = await fetch(
      "https://a.khalti.com/api/v2/epayment/initiate/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Key 25268e75e7f84d41afa6f02217261ad4`,
        },
        body: JSON.stringify(payload),
      }
    );

    const result = await khaltiResponse.json();

    if (khaltiResponse.ok) {
      res.json({
        success: true,
        data: result,
      });
    } else {
      res.json({
        success: false,
        message: "something went wrong",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.use("/product", require("./Routes/productRoutes"));
app.use("/user", require("./Routes/userRoutes"));
app.use("/admin", require("./Routes/adminRoutes"));
app.use("/recommend", require("./Routes/recommendationRoutes"));

app.listen(PORT, () => {
  console.log(`server is running at port : ${PORT}`);
});

// payment_url: http://localhost:2000/payment/khalti
