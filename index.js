require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
app.use(express.json());
app.use( cors({
  exposedHeaders: ['X-Total-Count'],
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const connectToMongo = require('./db');

//app.use("/api/user", require('./router/User'));
app.use("/api/zone",require("./router/Zone"));
app.use("/api/cart",require("./router/Cart"));
app.use("/api/order",require("./router/Order"));
app.use("/api/subscription",require("./router/Subscription"))



const fileUpload = require("express-fileupload");
app.use(
  fileUpload({
    useTempFiles: true,
    limits: { fileSize: 500 * 2024 * 1024 },
  })
);
app.use("/api/promotion",require("./router/Promotion"))
app.use("/api/rider",require("./router/Rider"));
app.use("/api/category",require("./router/Category"));



app.listen(process.env.PORT,()=>{
    console.log("Server is connected with",process.env.PORT)
    connectToMongo();
 })