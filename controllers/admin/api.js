const User = require("../../models/userModel");
const Product = require("../../models/productModel");
const { generateRandomPassword } = require("../../utils/helperutils");


exports.signup = async (req, res, next) => {
    try { 
      let user = await User.findOne({contact_no: req.body.contact_no   });
      console.log(user)
      if (user) {
          return res.status(501).json({ message: "user exists" });
      }
      let userAdar = await User.findOne({ aadhar_no:req.body.aadhar_no  });
      console.log(userAdar)
      if (userAdar) {
          return res.status(501).json({ message: "user exists" });
      }
     
      const password = generateRandomPassword();
      const newUser = new User({
        ...req.body,
        password,
      }); 
      await newUser.save();
      res.json({message:"User Created Successfully",newUser});
    } catch (error) {
      res.status(501).json({ message: error.message });
    }
  };
  exports.getAllUSer = async (req, res, next) => {
  try {
    const users = await User.find().exec();
    return res.status(200).json({ message: "all blogs", users });
  } catch (error) {
    return res.status(501).json("server error")
  }
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
console.log("user data")    
    res.status(200).json({
      success: true,
      message: 'User deleted successfully',
      data: deletedUser,
    });
} catch (error) {
  console.log(error)
}
}

exports.getOneUser = async (req, res, next) => {
  try {
    const id = req.query.id ||req.body.id
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

exports.getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.find().exec();
    return res.status(200).json({ message: "all blogs", products });
  } catch (error) {
    return res.status(501).json("server error")
  }
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

exports.getOneProduct = async (req, res, next) => {
  try {
    const id = req.query.id ||req.body.id
    const product = await Product.findById(id);
    if (!product) {
      res.status(404).json({ message: 'product not found' });
      return;
    }
   return res.status(200).json({ message: "product", product });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Server error' });
  }
}

exports.update_product = async (req, res, next) => {
  const Id = req.body.id;
  try {
    const updatedProduct = await Product.findByIdAndUpdate(Id, req.body, { new: true });

    if (!updatedProduct) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }
    res.status(200).json({
      success: true,
      message: 'Product updated successfully',
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


exports.delete_Product = async (req, res, next) => {
  const userId = req.query.id;
  console.log("objectobject")
  console.log(userId)
try {
  const deletedPoduct = await Product.findOneAndDelete({_id: userId});
console.log(deletedPoduct)
    if (!deletedPoduct) {
      return res.status(404).json({
        success: false,
        message: 'Product Not Found',
      });
    }
console.log("user data")    
    res.status(200).json({
      success: true,
      message: 'User Deleted Successfully',
      data:deletedPoduct,
    });
} catch (error) {
  console.log(error)
}
}