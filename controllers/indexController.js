const User = require("../models/userModel");
const Product = require("../models/productModel");
const Admin = require("../models/adminModel");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");


exports.homepage = (req, res, next) => {
  res.send("This is homepage...");
  // res.json({})
};
const generateRandomString = (length) => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};





exports.signup = async (req, res, next) => {
  try { 
    const password = generateRandomPassword();
    const newUser = new User({
      ...req.body,
      password,
    }); 
    await newUser.save();
    return res.json(newUser);
    res.json(newUser);
  } catch (error) {
    res.status(501).json({ message: error.message });
  }
};



exports.AdminSignup = async (req, res, next) => {
  try {
    let admin = await Admin.findOne({ email: req.body.email }).exec();
    if (admin) {
      return res.status(501).json({ message: "user exists" });
    }   
    const password = generateRandomPassword();
    const newAdmin = new Admin({
      ...req.body,
      password,
    }); 
    await newAdmin.save();
    return res.json(newAdmin);
    res.json(newAdmin);
  } catch (error) {
    res.status(501).json({ message: error.message });
  }
};

exports.signin = async (req, res, next) => {
  try {
    const { name, password } = req.body;
    let user = await User.findOne({ name }).exec();
    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }
    const token = jwt.sign({ id: user.id }, "secretkey");
    const datas = { user, token }
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
exports.adminSignin = async (req, res, next) => {
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

exports.getOneUser = async (req, res, next) => {
    try {
      const id = req.query.id;
      const user = await User.findById(id);
      if (!user) {
        res.status(404).json({ message: 'User not found' });
        return;
      }
     return res.status(200).json({ message: "user", user });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Server error' });
    }
 }

exports.getAllUSer = async (req, res, next) => {
  const token = req.query.token;
  if (!token) return res.status(401).json("Not logged in!")
  jwt.verify(token, "secretkey", async (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");
    const users = await User.find().exec();
    res.status(200).json({ message: "all blogs", users });
  })
}

exports.delete_User = async (req, res, next) => {
  const userId = req.query.id;
try {
  const deletedUser = await User.findOneAndDelete({_id: userId});

    if (!deletedUser) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }
    res.status(200).json({
      success: true,
      message: 'User deleted successfully',
      data: deletedUser,
    });
} catch (error) {
  console.log(error)
}
}



exports.update_user = async (req, res, next) => {
  const userId = req.body.id;
  try {
    const updatedUser = await User.findByIdAndUpdate(userId, req.body, { new: true });

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }
    res.status(200).json({
      success: true,
      message: 'User updated successfully',
      data: updatedUser,
    });

  } catch (error) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
}

exports.signout = (req, res, next) => {
  const token = req.query.token;
  res.clearCookie("token");
  console.log("firstfirst")
  res.status(200).json({ message: "Successfully Logged Out!" });
};



exports.product_create = async (req, res) => {
const token = req.body.token;
console.log(token)
if (!token) return res.status(401).json("Not logged in!");

jwt.verify(token, "secretkey", async (err, userInfo) => {
  if (err) return res.status(403).json("Token is not valid!");

  try {
    const unique_no = req.body.unique_no;
    const pieces = req.body.pieces;
    const city = req.body.city;
    const status = req.body.status;
    const formattedDate = new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" });
    let product = await Product.findOne({ unique_no });
    if (product) {
      console.log("product exit")
      if (product.status === "Pick") {
        const result = await Product.updateOne({unique_no:unique_no },  {$set:{pick_time:product.pick_time,
          pick_city:product.pick_city,
          pick_pieces:product.pick_pieces,
          status: status,
          deliver_pieces:pieces,
          deliver_time:formattedDate,
          deliver_city:city}})
        console.log("first")
        return res.status(200).json({ message: "Product delivered" });
      }else{
        console.log("Product status is Deliver");
        return res.status(401).json("product code no doesn't vaild!");
      }
    } else {
      console.log("Product does not exist");

      if (status === "Deliver") {
        console.log("Cannot deliver a product that has not been picked yet");
        return res
          .status(401)
          .json({ message: "Please first pick this product, then deliver" });
      }else{
         console.log("this is deliver product ");
        product = await Product.create({
          unique_no: unique_no,
          pick_pieces: pieces,
          pick_city: city,
          status: status,
          pick_time: formattedDate,
        });
  
        console.log("Product created");
        return res.status(200).json({ message: "Product created" });
      }
      
    }
  } catch (error) {
    console.log("Error:", error);
    return res.status(400).send(error);
  }
});
  };


exports.getAllProducts = async (req, res, next) => {
  const token = req.query.token 
  const formattedDate = new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" });
  console.log(formattedDate)
  if (!token) return res.status(401).json("Not logged in!")
  jwt.verify(token, "secretkey", async (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");
    const products = await Product.find({})
  
    return res.status(200).json({ message: "all blogs", products });
  })
}


exports.delete_product = async (req, res, next) => {
  const userId = req.query.id;
  console.log(userId)
try {
  const deletedUser = await Product.findOneAndDelete({_id: userId});

    if (!deletedUser) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }
    res.status(200).json({
      success: true,
      message: 'User deleted successfully',
      data: deletedUser,
    });
} catch (error) {
  console.log(error)
}
}


exports.update_product = async (req, res, next) => {
  const Id = req.body.id;
  try {
    const updatedProduct = await Product.findByIdAndUpdate(Id, req.body, { new: true });

    if (!updatedProduct) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }
    res.status(200).json({
      success: true,
      message: 'User updated successfully',
      data: updatedProduct,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
}