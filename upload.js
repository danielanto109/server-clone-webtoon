const multer = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null, './public/uploads/')
    },
    filename: function(req, file, cb){
        cb(null, new Date().toISOString() + file.originalname)
    }
})

exports.upload  = multer({storage})