const multer = require("multer");
const path = require("path");
const util = require("util");
const sharp = require("sharp");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

// const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb("Please upload only images.", false);
  }
};

let upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 100000000 },
});

// upload multiple image middleware
const uploadFiles = upload.array("images", 3);
var uploadFilesMiddleware = util.promisify(uploadFiles);

// upload single image middleware
const uploadFile = upload.single("image");
var uploadFileMiddleware = util.promisify(uploadFile);

const uploadImage = (req, res, next) => {
  uploadFileMiddleware(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      if (err.code === "LIMIT_UNEXPECTED_FILE") {
        return res.status(400).send({
          status: 400,
          isSuccess: false,
          message: "Too many files are uploaded.",
        });
      }
    } else if (err) {
      return res.status(404).send({
        status: 404,
        isSuccess: false,
        message: err,
      });
    }
    next();
  });
};

/**
 * @reference {https://sharp.pixelplumbing.com/api-resize}
 * @reference {https://www.bezkoder.com/node-js-upload-resize-multiple-images/}
 */

// resize images
const resizeImage = async (req, res, next) => {
  if (!req.file) {
    return res.status(400).send({
      status: 400,
      isSuccess: false,
      message: "Please upload the image",
    });
  }

  const file = req.file;
  const filename = file.filename.replace(/\..+$/, "");
  const newFilename = `thumbnail-${filename}.jpeg`;

  // resizing the uploaded image
  const resizeImage = sharp(file.path);

  // resize heightest weight or height value and other will get resize automatically
  const metaData = await resizeImage.metadata();
  let resizeObject = { width: 200 };
  if (metaData.height > metaData.width) {
    resizeObject = { height: 200 };
  }

  await resizeImage
    .resize(resizeObject)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(path.join(__dirname, "../uploads", newFilename));

  req.thumbnail = newFilename;

  next();
};

module.exports = {
  uploadFilesMiddleware,
  uploadFileMiddleware,
  uploadImage,
  resizeImage,
};
