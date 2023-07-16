const User = require("../../models/userModel");
const Product = require("../../models/productModel");
const { generateRandomPassword,generateToken } = require("../../utils/helperutils");
const jwt = require("jsonwebtoken");
const Consignment = require("../../models/consignmentModel");
const SetConsignment = require("../../models/SetConsignmentModel");
const SetConsignmentForCity = require("../../models/SetConsignmentModelCity");


const secretKey = "secretkey";

exports.signup = async (req, res, next) => {
    try { 
      let user = await User.findOne({contact_no: req.body.contact_no   });
 
      if (user) {
          return res.status(501).json({ message: "user exists" });
      }
      let userAdar = await User.findOne({ aadhar_no:req.body.aadhar_no  });
     
      if (userAdar) {
          return res.status(501).json({ message: "user exists" });
      }
      let token = await generateToken({
        contact_no: req.body.contact_no,
      });
      const password = generateRandomPassword();
      const newUser = new User({
        ...req.body,
        password,
        token
      }); 
      await newUser.save();
      res.json({message:"User Created Successfully",newUser});
    } catch (error) {
      res.status(501).json({ message: error.message });
    }
  };

  exports.getUserByToken = async (req,res,next)=>{
    try {
     const {token} = req.query || req.body
     console.log(token)
     const user = await User.findOne({ token:token })
     if (user) {
      return res.status(200).json(user);
      
    } else {
      // User not found
      return res.status(404).json({ error: 'User not found' });
    }
    } catch (error) {
      return res.status(501).json("server error")
    }
  }
  exports.getAllUSer = async (req, res, next) => {
    try {
     
      const user = await User.find().exec();
      if (!user) {
        res.status(404).json({ message: 'User not found' });
        return;
      }
     return res.status(200).json({ message: "user", user });
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
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
    res.status(200).json({
      success: true,
      message: 'User deleted successfully',
      data: deletedUser,
    });
} catch (error) {
  res.status(500).json({ message: 'Server error' });
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
  res.status(500).json({ message: 'Server error' });
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
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
}


exports.delete_Product = async (req, res, next) => {
  const userId = req.query.id;

try {
  const deletedPoduct = await Product.findOneAndDelete({_id: userId});
    if (!deletedPoduct) {
      return res.status(404).json({
        success: false,
        message: 'Product Not Found',
      });
    }
    res.status(200).json({
      success: true,
      message: 'Product Deleted Successfully',
      data:deletedPoduct,
    });
} catch (error) { res.status(500).json({
  success: false,
  message: 'Server error',
});
}
}


exports.search = async (req,res,next)=>{
  try {
   const body = req.body;
   const data = await Product.find({ unique_no: { $regex: `^${body.text}` } });
     res.json(data)
  } catch (error) {
    console.log(error)
    next(error)
  }
}

exports.searchDetails = async (req,res,next)=>{
  try {
   const body = req.body;
   const data = await Product.find({ unique_no: { $regex: `^${body.inputValue}` } });
    res.json(data)
  } catch (error) {
    console.log(error)
    next(error)
  }
}


exports.genareteConsignment = async (req, res, next) => {
  try {
    const { uniqueNO, quantity } = req.body;

    const uniqueNumbers = [];
    const numberRegex = /\d+$/; // Match the number at the end of the string

    // Extract the numeric part from uniqueNO
    const baseNumber = parseInt(uniqueNO.match(numberRegex)[0]);

    for (let i = 0; i < quantity; i++) {
      const number = (baseNumber + i).toString().padStart(4, '0');
      const generatedUniqueNO = uniqueNO.replace(numberRegex, number);
      uniqueNumbers.push(generatedUniqueNO);
    }

    const consignments = await Promise.all(
      uniqueNumbers.map(async (uniqueNumber) => {
        const consignment = new Consignment({ unique_no: uniqueNumber });
        return await consignment.save();
      })
    );
    res.json(consignments);
  } catch (error) {
    console.log(error);
    res.json(error);
    next(error);
  }
};

exports.getConsignment = async (req, res, next) => {
  try {
    const { token } = req.query || req.body;
    console.log(token);
    const user = await User.findOne({ token: token });
    if (user) {
      console.log(user.state);
      const consignments = await Consignment.find({ state: user.state }).sort({ unique_no: 1 });
      if (!consignments) {
        return res.status(404).json({ message: 'Consignments not found' });
      }
      return res.status(200).json({ message: 'Consignments', consignments });
    } else {
      // User not found
      return res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.log(error);
    res.json(error);
    next(error);
  }
};


exports.getOneConsignment = async (req, res, next) => {
  try {
    const { token } = req.query || req.params;
    console.log(token,"FVDbgfb");
    console.log(req.query, req.params)
    const user = await User.findOne({ token: token });
    if (user) {
      console.log(user.state);
      const consignments = await Consignment.findOne().sort({ unique_no: 1 });

      if (!consignments) {
        return res.status(404).json({ message: 'Consignments not found' });
      }
      return res.status(200).json({ message: 'Consignments', consignments });
    } else {
      // User not found
      return res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.log(error);
    res.json(error);
    next(error);
  }
};

exports.assignCNoteNumbers = async (req, res, next) => {
  try {
    const { c_note, quantity, state } = req.body;

    const uniqueNumbers = [];
    const numberRegex = /\d+$/; // Match the number at the end of the string

    // Extract the numeric part from uniqueNO
    const baseNumber = parseInt(c_note.match(numberRegex)[0]);

    for (let i = 0; i < quantity; i++) {
      const number = (baseNumber + i).toString().padStart(4, '0');
      const generatedUniqueNO = c_note.replace(numberRegex, number);
      uniqueNumbers.push(generatedUniqueNO);
    }

    // Delete existing consignments from the Consignment table
    await Consignment.deleteMany({ unique_no: { $in: uniqueNumbers } });

    const consignments = await Promise.all(
      uniqueNumbers.map(async (uniqueNumber) => {
        const setConsignment = new SetConsignment({ unique_no: uniqueNumber,state:state });
        return await setConsignment.save();
      })
    );
    res.json(consignments);
  } catch (error) {
    console.log(error);
    res.json(error);
    next(error);
  }
};

exports.AssignForCity = async (req, res, next) => {
  try {
    const { c_note, quantity, city, state } = req.body;

    const uniqueNumbers = [];
    const numberRegex = /\d+$/; // Match the number at the end of the string
 console.log(req.body)
    // Extract the numeric part from uniqueNO
    const baseNumber = parseInt(c_note.match(numberRegex)[0]);

    for (let i = 0; i < quantity; i++) {
      const number = (baseNumber + i).toString().padStart(4, '0');
      const generatedUniqueNO = c_note.replace(numberRegex, number);
      uniqueNumbers.push(generatedUniqueNO);
    }

    // Delete existing Setconsignments from the Consignment table
    await SetConsignment.deleteMany({ unique_no: { $in: uniqueNumbers } });

    const consignments = await Promise.all(
      uniqueNumbers.map(async (uniqueNumber) => {
        const setConsignmentCity = new SetConsignmentForCity({ unique_no: uniqueNumber,state:state, city:city });
        return await setConsignmentCity.save();
      })
    );
    res.json(consignments);
  } catch (error) {
  console.log(error);
  res.json(error);
  next(error);
  }
}

exports.getOneConsignmentState = async (req, res, next) => {
  try {
    const { token } = req.query || req.params;
    const user = await User.findOne({ token: token });
    if (user) {
      console.log(user.state);
      const consignments = await SetConsignment.findOne().sort({ unique_no: 1 });

      if (!consignments) {
        return res.status(404).json({ message: 'Consignments not found' });
      }
      return res.status(200).json({ message: 'Consignments', consignments });
    } else {
      // User not found
      return res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.log(error);
    res.json(error);
    next(error);
  }
};

exports.getOneConsignmentForState = async (req, res, next) => {
  try {
    const { city } = req.query || req.params;
   
      const consignments = await SetConsignmentForCity.find({city:city}).sort({ unique_no: 1 });
      if (!consignments) {
        return res.status(404).json({ message: 'Consignments not found' });
      }
      return res.status(200).json({ message: 'Consignments', consignments });
   
  } catch (error) {
    console.log(error);
    res.json(error);
    next(error);
  }
};
exports.getAllNumber = async (req,res,next) => { 
  try {
   const data = await Consignment.find()
      res.json(data);
  } catch (error) {
    console.log(error)
    res.json(error);
    next(error)
  }
}

exports.getAllNumberState = async (req,res,next) => { 
  try {
    const { state} = req.query
    console.log(state)
   const data = await SetConsignment.find()
      res.json(data);
  } catch (error) {
    console.log(error)
    res.json(error);
    next(error)
  }
}

exports.getAllNumberStatecity = async (req,res,next) => { 
  try {
    const { state} = req.query
    console.log(state)
   const data = await SetConsignmentForCity.find()
      res.json(data);
  } catch (error) {
    console.log(error)
    res.json(error);
    next(error)
  }
}