const User = require("../../models/userModel");
const jwt = require("jsonwebtoken");


  exports.signin = async (req, res, next) => {
    try {
      const { name, password } = req.body;
      let user = await User.findOne({ name }).exec();
      if (!user) {
        return res.status(404).json({ message: "User Not Found" });
      }
      const token = jwt.sign({ id: user.id }, "secretkey");
      const datas = { user, token }
      res.cookie("accessToken", token, {
        maxAge: 999900000,
        httpOnly: true,
      })
        .status(200)
        .json({message:"Login Successfully",datas});
    } catch (error) {
      res.status(501).json({ message: error.message });
    }
  };