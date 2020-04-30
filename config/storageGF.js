const GridFsStorage = require('multer-gridfs-storage');
const mongoURI = require('../config/keys.js').MongoURI;
const multer = require('multer');
//const mongoURI = require('keys.js').MongoURI;


const storage = new GridFsStorage({
  url: mongoURI,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString('hex') + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: 'uploads'
        };
        resolve(fileInfo);
      });
    });
  }
});

const upload = multer({storage});
module.exports = upload;
