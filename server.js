require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const userRoute = require("./routes/user");
const cors = require("cors");

//express app
const app = express();

app.use(cors());

app.use(express.json());
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});
app.use("/api/user", userRoute);
//veritabanı bağlantısı
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Veritabanı bağlantısı başarılı");
    //request leri dinleyelim
    app.listen(process.env.PORT, () => {
      console.log(`${process.env.PORT}. port dinleniyor`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
