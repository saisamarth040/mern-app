require("dotenv").config({ path: "./.env" });
const express = require("express");
const session = require("express-session");
const app = express();
var cors = require('cors')
const PORT = process.env.PORT || 4000;
const connectDatabase = require("./models/db");
const adminRouter  =  require('./routes/admin')
const userRouter  =  require('./routes/users')
const path = require("path");
const cloudinary = require('cloudinary');

const corsOptions = {
    origin: "*",
  };

  cloudinary.v2.config({
     cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
     api_key:process.env.CLOUDINARY_CLOUD_API,
     api_secret:process.env.CLOUDINARY_CLOUD_SECRET
  })

app.use(cors(corsOptions));
app.use(express.static(path.join(__dirname, "/views/build")));
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/views/build/index.html"));
});




app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", userRouter.auth);
app.use("/", userRouter.api);
app.use("/admin", adminRouter.auth);
app.use("/admin", adminRouter.api);
app.listen(PORT, () =>{
    connectDatabase();
 console.log(`server running on port: ${PORT}`)
})