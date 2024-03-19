const mongoose = require("mongoose");
require("dotenv").config();
const dBPassword = process.env.DB_PASSWORD;

const URI = `mongodb+srv://gestionalumnosanato:${dBPassword}@cluster0.3mhurs6.mongodb.net/anatomia?retryWrites=true&w=majority&appName=Cluster0`;
module.exports = mongoose
  .connect(URI)
  .then(() => {
    console.log("anato database connected");
  })
  .catch((error) => console.log("error en la conexion", error.message));
