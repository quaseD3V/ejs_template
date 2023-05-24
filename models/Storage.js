const multer = require('multer');
var maxSize = 1 * 1000 * 1000;


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})

var upload = multer({
    storage: storage,
    limits: {
        fileSize: maxSize
    },
    fileFilter: function (req, file, cb) {
        if (file.mimetype == 'image/png' || file.mimetype == 'image/jpg' || file.mimetype == 'image/jpeg') {
            cb(null, true)
        }
        cb(null, false, new Error('I don\'t have a clue!'));
    }
}).single('avatar');

module.exports = { storage: storage, upload: upload, multer: multer }