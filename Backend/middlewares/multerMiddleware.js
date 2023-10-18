const multer = require("multer");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

// const storage = multer.memoryStorage();

// const fileFilter = ( req, file, cb ) => {
//     if(file.mimetype.startsWith('image')){
//         cb( null, ture)
//     }else{
//         cb('invalid imagefile', false)
//     }
// }
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "../Frontend/chatapp-frontend/assets/images/");
  },
  filename: (req, file, cb) => {
    // cb(null, file.fieldname + "_" + Date.now + path.extname(file.originalname));
    // file.fieldname + "-" +
    cb(null, file.fieldname + "-" + uuidv4() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });
module.exports = { upload };
