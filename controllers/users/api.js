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
  console.log(req.body)
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

// exports.pdf = async (req, res, next) => {
//   try {
//     console.log(req.params);
//     const unique_no = req.params.id;
//     const product = await Product.findOne({ unique_no });
//     if (!product) {
//       return res.status(404).json({ message: 'Product not found' });
//     }
// console.log(product)
//     // Create a new PDF document
//     const doc = new PDFDocument();

//     // Set the appropriate headers for the response
//     res.setHeader('Content-Type', 'application/pdf');
//     res.setHeader('Content-Disposition', `attachment; filename=${unique_no}.pdf`);

//     // Pipe the PDF document directly to the response stream
//     doc.pipe(res);
//     // doc.image('https://res.cloudinary.com/de692wzxl/image/upload/v1689614612/logo48_jcd72c.png', 50, 50, { width: 100 });

//     //     // Add company information
//         doc.fontSize(18).text('Sai Samarth Logistics ', 40, 60, { align: 'left' });
//         doc.fontSize(18).text('bhopal', 40, 80, { align: 'left' });
//         doc.moveDown();
//         doc.fontSize(17).text(`${product.pick_art}`, 180, 60, { align: 'right', underline: true  });
//         doc.moveDown();
 
    
//     // Generate the PDF content
//     // doc.fontSize(14).text(`Consignment Number: ${product.unique_no}`, 40, 180 ,{align: 'left', underline: true});
//     //     doc.moveDown();
//     doc.fontSize(14).text(`Consignment Number`, 40, 200 ,{align: 'left', underline: true});
//     doc.fontSize(14).text(`${product.unique_no}`, 190, 200 ,{align: 'left'});
//     doc.fontSize(12).text(`Pieces`, 40, 220 ,{align: 'left', underline: true});
//     doc.fontSize(12).text(`${product.pick_pieces}`, 190, 220 ,{align: 'left', underline: true});
//     doc.fontSize(12).text(`City`, 40, 240 ,{align: 'left', underline: true});
//     doc.fontSize(12).text(`${product.pick_city}`, 190, 240 ,{align: 'left', underline: true});
//     doc.fontSize(12).text(`Status`, 40, 260 ,{align: 'left', underline: true});
//     doc.fontSize(12).text(`${product.status}`, 190, 260 ,{align: 'left', underline: true});
//     doc.fontSize(12).text(`Pick Time`, 40, 280 ,{align: 'left', underline: true});
//     doc.fontSize(12).text(`${product.pick_time}`, 190, 280 ,{align: 'left', underline: true});
//     doc.fontSize(12).text(`Pick Art`, 40, 300 ,{align: 'left', underline: true});
//     doc.fontSize(12).text(`${product.pick_art}`, 190, 300 ,{align: 'left', underline: true});

   

//     // End the document and response stream
//     doc.end();
//   } catch (error) {
//     res.json({ message: error });
//     next(error);
//   }
// };


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

    // Set fonts and font sizes
    doc.font('Helvetica-Bold').fontSize(18);
    doc.fillColor('#410c0c'); 
    // Add company information
    doc.font('Helvetica').fontSize(12)
    doc.text('Sai Samarth Logistics', 40, 40);
    doc.font('Helvetica').fontSize(18);
    doc.text('Bhopal', 40, 60);

    // Add bill header
    doc.fillColor('#410c0c'); 
    doc.font('Helvetica-Bold').fontSize(18).text('INVOICE', 450, 40, { align: 'right' });
    doc.fontSize(12).text(`Date: ${new Date().toLocaleDateString()}`, 450, 60, { align: 'right' });

    // Add customer details
    // doc.fontSize(14).text(`Customer Support: saisamarthlogistic.com`, 40, 120);
    // doc.fontSize(12).text(` Support Email: saisamarthlogistic040@gmail.com`, 40, 140);
    // Add more customer details if needed
    // doc.font('Helvetica-Bold').fontSize(18).text(`${product.pick_art}`, 450, 150, { align: 'left', continued: true });
    doc.fillColor('#49368d'); 
    doc.font('Helvetica').fontSize(11)
    doc.text(`${product.pick_art}`, 40, 130);
    doc.fillColor('#68392b'); 
    doc.font('Helvetica').fontSize(14);
    doc.text('ART CENTER', 40, 150);

    doc.moveTo(40, 170).lineTo(550, 170).strokeColor('#68392b').stroke();

    // Add bill items
    doc.fillColor('#000'); 
    doc.font('Helvetica').fontSize(13)
    doc.text('Consignment Number', 60, 200);
    doc.text(`Pieces`, 200, 200);
    doc.text(`City`, 280, 200);
    doc.text(`Status`, 380, 200);
    doc.text(`Art Center`, 460, 200);


    doc.fillColor('#49368d'); 

    doc.fontSize(12).text(`${product.unique_no}`, 60, 230);
    doc.fontSize(12).text(`${product.pick_pieces}`, 200, 230);
    doc.fontSize(12).text(`${product.pick_city}`, 280, 230);
    doc.fontSize(12).text(`${product.status}`, 380, 230);
    doc.fontSize(12).text(`${product.pick_art}`, 460, 230);
    
    // Add more bill items if needed
    doc.fillColor('#68392b'); 

    doc.moveTo(40, 400).lineTo(550, 400).strokeColor('#68392b').stroke();
    doc.fontSize(12).text(`Customer Support: saisamarthlogistic.com`, 40, 420);
    doc.fontSize(12).text(`Support Email: saisamarthlogistic040@gmail.com`, 40, 440);
    // Calculate and add total
    // const total = product.pick_pieces * product.price; // Adjust calculation based on your data
    // doc.fontSize(14).text('Total:', 350, 400, { align: 'right' });
    // doc.fontSize(14).text(`$${total.toFixed(2)}`, 450, 400, { align: 'right' });

    // End the document and response stream
    doc.end();
  } catch (error) {
    res.json({ message: error });
    next(error);
  }
};
