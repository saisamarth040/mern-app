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
    console.log(req.params);
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
    // doc.image('https://res.cloudinary.com/de692wzxl/image/upload/v1689614612/logo48_jcd72c.png', 50, 50, { width: 100 });

    //     // Add company information
        doc.fontSize(18).text('Sai Samarth Logistics ', 40, 60, { align: 'left' });
        doc.fontSize(18).text('bhopal', 40, 80, { align: 'left' });
        doc.moveDown();
        doc.fontSize(17).text('Indore', 180, 60, { align: 'right', underline: true  });
        doc.moveDown();
 
    
    // Generate the PDF content
    // doc.fontSize(14).text(`Consignment Number: ${product.unique_no}`, 40, 180 ,{align: 'left', underline: true});
    //     doc.moveDown();
    doc.fontSize(14).text(`Consignment Number`, 40, 200 ,{align: 'left', underline: true});
    doc.fontSize(14).text(`${product.unique_no}`, 190, 200 ,{align: 'left'});
    doc.fontSize(12).text(`Pieces`, 40, 220 ,{align: 'left', underline: true});
    doc.fontSize(12).text(`${product.pick_pieces}`, 190, 220 ,{align: 'left', underline: true});
    doc.fontSize(12).text(`City`, 40, 240 ,{align: 'left', underline: true});
    doc.fontSize(12).text(`${product.pick_city}`, 190, 240 ,{align: 'left', underline: true});
    doc.fontSize(12).text(`Status`, 40, 260 ,{align: 'left', underline: true});
    doc.fontSize(12).text(`${product.status}`, 190, 260 ,{align: 'left', underline: true});
    doc.fontSize(12).text(`Pick Time`, 40, 280 ,{align: 'left', underline: true});
    doc.fontSize(12).text(`${product.pick_time}`, 190, 280 ,{align: 'left', underline: true});
    doc.fontSize(12).text(`Pick Art`, 40, 300 ,{align: 'left', underline: true});
    doc.fontSize(12).text(`${product.pick_art}`, 190, 300 ,{align: 'left', underline: true});

   

    // End the document and response stream
    doc.end();
  } catch (error) {
    res.json({ message: error });
    next(error);
  }
};



// exports.pdf = async (req, res, next) => {
//   try {
//     console.log(req.params);
//     const unique_no = req.params.id;
//     const product = await Product.findOne({ unique_no });
//     if (!product) {
//       return res.status(404).json({ message: 'Product not found' });
//     }

//     // Create a new PDF document
//     const doc = new PDFDocument();

//     // Buffer to store the PDF data
//     const buffers = [];
//     doc.on('data', (chunk) => buffers.push(chunk));
//     doc.on('end', () => {
//       // Concatenate all the buffers into a single buffer
//       const pdfData = Buffer.concat(buffers);

//       // Set the appropriate headers for the response
//       res.setHeader('Content-Type', 'application/pdf');
//       res.setHeader('Content-Disposition', `attachment; filename=${unique_no}.pdf`);

//       // Send the PDF data in the response
//       res.send(pdfData);
//     });

//     // Set font styles
//     doc.font('Helvetica-Bold');
//     doc.fontSize(20);

//     // Add company logo
//     doc.image('https://res.cloudinary.com/de692wzxl/image/upload/v1689614612/logo48_jcd72c.png', 50, 50, { width: 100 });

//     // Add company information
//     doc.text('Sai Samarth Logistics ', 180, 60, { align: 'right' });
//     doc.text('bhopal', 180, 80, { align: 'right' });
//     doc.moveDown();

//     // Add customer information
//     doc.fontSize(14).text(`Customer Name: ${product.customerName}`);
//     doc.moveDown();

//     // Add bill details
//     doc.fontSize(14).text(`Bill Number: ${product.unique_no}`);
//     doc.moveDown();

//     // Add product details
//     doc.fontSize(14).text('Product Details', { underline: true });
//     doc.text(`Pieces: ${product.pick_pieces}`);
//     doc.text(`Status: ${product.status}`);
//     doc.text(`Pick Time: ${product.pick_time}`);
//     doc.text(`Pick Art: ${product.pick_art}`);
//     doc.moveDown();
 
//     // Add additional information or notes
//     doc.fontSize(12).text('Additional Information');
//     doc.fontSize(10).text('Lorem ipsum dolor sit amet, consectetur adipiscing elit.');
//     doc.moveDown();

//     // Add signature section
//     doc.fontSize(12).text('Authorized Signature', { align: 'right' });
//     doc.text('_________________________', { align: 'right' });

//     // End the document
//     doc.end();
//   } catch (error) {
//     res.json({ message: error });
//     next(error);
//   }
// };