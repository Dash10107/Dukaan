const multer = require('multer');
// biome-ignore lint/style/useNodejsImportProtocol: <explanation>
const path = require('path');

// Configure Multer for file uploads
const diskStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/'); // Save files in the "uploads" directory
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const fileFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname);
  if (ext !== '.xlsx' && ext !== '.csv') {
    return cb(new Error('Only Excel or CSV files are allowed'), false);
  }
  cb(null, true);
};

const  upload = multer({ storage: diskStorage, fileFilter }).single('file');
// export singleUpload and upload
// module.exports = { singleUpload, upload };

const sharp = require("sharp");
// biome-ignore lint/style/useNodejsImportProtocol: <explanation>
const fs = require("fs");
const imagestorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../public/images/"));
  },
  filename: (req, file, cb) => {
    const uniquesuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(null, `${file.fieldname}-${uniquesuffix}.jpeg`);
  },
});

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb({ message: "Unsupported file format" }, false);
  }
};

const uploadPhoto = multer({
  storage: imagestorage,
  fileFilter: multerFilter,
  limits: { fileSize: 1000000 },
});

const productImgResize = async (req, res, next) => {
  if (!req.files) return next();
  await Promise.all(
    req.files.map(async (file) => {
      await sharp(file.path)
        .resize(300, 300)
        .toFormat("jpeg")
        .jpeg({ quality: 90 })
        .toFile(`public/images/products/${file.filename}`);
      fs.unlinkSync(`public/images/products/${file.filename}`);
    })
  );
  next();
};

module.exports = { uploadPhoto, productImgResize, upload}