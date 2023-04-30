const Admin = require("../../models/adminModel");
const jwt = require("jsonwebtoken");

exports.signup = async (req, res, next) => {
    try {
      let admin = await Admin.findOne({ email: req.body.email }).exec();
      if (admin) {
        return res.status(501).json({ message: "user exists" });
      }   
      
      const newAdmin = new Admin({
        ...req.body        
      }); 
      await newAdmin.save();
      return res.json(newAdmin);
      res.json({message:"admin created successfully",newAdmin});
    } catch (error) {
      res.status(501).json({ message: error.message });
    }
  };
exports.signin = async (req, res, next) => {
    try {
      const { email, password } = req.body;
      let admin = await Admin.findOne({ email }).exec();
      if (!admin) {
        return res.status(404).json({ message: "admin not found" });
      }
      const token = jwt.sign({ id: admin.id }, "secretkey");
      const datas = { admin, token }
      res.cookie("accessToken", token, {
        maxAge: 999900000,
        httpOnly: true,
      })
        .status(200)
        .json(datas);
    } catch (error) {
      res.status(501).json({ message: error.message });
    }
  };
  

  