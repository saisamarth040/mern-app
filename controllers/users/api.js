const Product = require("../../models/productModel");
const Consignment = require("../../models/consignmentModel");
const SetConsignmentForCity = require("../../models/SetConsignmentModelCity");
const getDataUri = require("../../utils/datauri");
const cloudinary = require('cloudinary');
const PDFDocument = require('pdfkit');

exports.product_pick = async (req,res,next)=>{
  const unique_no = req.body.unique_no;
  const pieces = req.body.pieces;
  const city = req.body.city;
  const art = req.body.art;
  const status = "PICK"
  const formattedDate = new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" });
  try {
    console.log(req.body)
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

exports.product_deliver = async (req, res, next) => {
  const file = req.file;
  const unique_no = req.body.unique_no;
  const pieces = req.body.pieces;
  const city = req.body.city;
  const art = req.body.art;
  const status = 'DELIVER';
  const formattedDate = new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' });
  
  try {
    console.log("objectobjectobjectobject")
    console.log(unique_no)
    let product = await Product.findOne({ unique_no });
    if (!product) {
      return res.status(501).json('Product Not Found!');
    }
    if (product.status === 'DELIVER') {
      return res.status(501).json('Product Already Delivered');
    }

    const fileUri = getDataUri(file);
    const mycloud = await cloudinary.v2.uploader.upload(fileUri.content);
    const result = await Product.updateOne(
      { unique_no: unique_no },
      {
        $set: {
          pick_time: product.pick_time,
          pick_city: product.pick_city,
          pick_pieces: product.pick_pieces,
          status: status,
          deliver_pieces: pieces,
          deliver_time: formattedDate,
          deliver_city: city,
          deliver_art: art,
          file: {
            public_id: mycloud.public_id,
            url: mycloud.secure_url,
          },
        },
      }
    );

    const consignment = await SetConsignmentForCity.findOne({ unique_no });
    if (consignment) {
      await consignment.deleteOne();
      console.log('Consignment deleted:', consignment);
    } else {
      console.log('Consignment not found');
    }

    return res.status(200).json({ message: 'Product Delivered Successfully', result });
  } catch (error) {
    res.json({ message: error });
    next(error);
  }
};

exports.pdf = async (req, res, next) => {
    try {
      console.log(req.params)
      const unique_no = req.params.id;
      const product = await Product.findOne({ unique_no });
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
      // Create a new PDF document
  
      const doc = new PDFDocument();
      // Set the appropriate headers for the response
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', `attachment; filename=${unique_no}.pdf`);
      // Pipe the PDF document directly to the response stream
      doc.pipe(res);
  
   
      // Generate the PDF content
      doc.text(`Product Details - ${product.unique_no}`);
      doc.text(`Pieces: ${product.pick_pieces}`);
      doc.text(`City: ${product.pick_city}`);
      doc.text(`Status: ${product.status}`);
      doc.text(`Pick Time: ${product.pick_time}`);
      doc.text(`Pick Art: ${product.pick_art}`);
  
      // End the document and response stream
      doc.end();
  } catch (error) {
    res.json({ message: error });
    next(error);
  }
};