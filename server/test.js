const express = require('express');
const multer = require('multer');
const path = require('path');
const port = 3000;
const cors = require('cors');
const fs = require('fs');
const axios = require('axios'); // Import Axios
const app = express();

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

app.use(express.json());

var index = 1;
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const propertyId = req.query.propertyId;
    const uploadPath = path.join(__dirname, '../public/image_db', propertyId || 'default');
    fs.mkdirSync(uploadPath, { recursive: true });
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    
    // change here instead of date use index like firt image 1 second 2 etc
    cb(null, file.fieldname + '-' + index + file.originalname.match(/\..*$/)[0]);
    index++;
  }
});

const multiUpload = multer({ storage }).fields([{ name: 'uploadedImages' }]);

app.post('/upload', (req, res) => {
  multiUpload(req, res, async function (err) {
    if (err instanceof multer.MulterError) {
      res.status(500).send({ error: { message: `Multer uploading error: ${err.message}` } }).end();
      return;
    } else if (err) {
      if (err.name === 'ExtensionError') {
        res.status(413).send({ error: { message: err.message } }).end();
      } else {
        res.status(500).send({ error: { message: `unknown uploading error: ${err.message}` } }).end();
      }
      return;
    }

    const propertyId = req.query.propertyId;
    console.log('propertyId:', propertyId);
    console.log('req.files:', req.files);

    // Assuming each uploaded image corresponds to one propertyId
    // const uploadedImages = req.files.uploadedImages.map(file => {
    //   return {
    //     path: path.join('public/image_db', propertyId, 'uploadedImages-' || 'default'),
    //     propertyId: propertyId
    //   };
    // });
    const uploadedImages = req.files.uploadedImages.map((file, index) => {
        return {
          path: path.join('/image_db', propertyId, `uploadedImages-${index + 1}${file.originalname.match(/\..*$/)[0]}`),
          propertyId: propertyId
        };
      });

    console.log('uploadedImages:', uploadedImages);
    
    try {
      await axios.post('http://localhost:8080/api/images', uploadedImages);
      res.status(200).end('Your files uploaded.');
    } catch (error) {
      console.error('Error adding images:', error);
      res.status(500).send({ error: { message: 'Error adding images' } }).end();
    }
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
