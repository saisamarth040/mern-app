const Product = require("../../models/productModel");
const getDataUri = require("../../utils/datauri");
const cloudinary = require('cloudinary');

exports.product_pick = async (req,res,next)=>{
  const unique_no = req.body.unique_no;
  const pieces = req.body.pieces;
  const city = req.body.city;
  const art = req.body.art;
  const status = "PICK"
  const formattedDate = new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" });
  try {
    let product = await Product.findOne({ unique_no });
    if(product){
      return res.status(401).json("product code no doesn't vaild!");
    }
    product = await Product.create({
      unique_no: unique_no,
      pick_pieces: pieces,
      pick_city: city,
      status: status,
      pick_time: formattedDate,
      pick_art:art,
    });
    return res.status(200).json({ message: "Product Create Successfully" });
  } catch (error) {
    next(error)
  }
}
exports.product_deliver = async (req,res,next)=>{
  const file =  req.file;
  const unique_no = req.body.unique_no;
  const pieces = req.body.pieces;
  const city = req.body.city;
  const art = req.body.art;
  const status = "DELIVER"
  const formattedDate = new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" });
  try {
    let product = await Product.findOne({ unique_no });
    if(!product){
      return res.status(501).json("Product Nor Found!");
    }
    if(product.status==="DELIVER"){
return res.status(501).json("Product Already Delived")
    }

    const fileUri = getDataUri(file)
   const mycloud = await cloudinary.v2.uploader.upload(fileUri.content)
    const result = await Product.updateOne({unique_no:unique_no },  {$set:{pick_time:product.pick_time,
      pick_city:product.pick_city,
      pick_pieces:product.pick_pieces,
      status: status,
      deliver_pieces:pieces,
      deliver_time:formattedDate,
      deliver_city:city,
      deliver_art:art,
      file:{
        public_id:mycloud.public_id,
        url:mycloud.secure_url,
      }
    }})
    return res.status(200).json({ message: "Product Delivered Successfully" ,result });
  } catch (error) {
    res.json({message:error})
    next(error)
  }
}

