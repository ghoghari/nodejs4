var multer = require("multer");

const fileStorageEngine = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./public/employees");
        // cb(null, path.join(__dirname, '../uploads'));
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        // cb(null,Date.now() + '--' + file.originalname);
        cb(null,uniqueSuffix+'.jpg');
    },
});

const upload = multer({ storage: fileStorageEngine });

const fileStorageEngine2 = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./public/client");
        // cb(null, path.join(__dirname, '../uploads'));
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        console.log(uniqueSuffix)
        // cb(null,Date.now() + '--' + file.originalname);
        cb(null,file.originalname);
    },
});

const upload2 = multer({ storage: fileStorageEngine2 });

const fileStorageEngine3 = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./public/client/company");
        // cb(null, path.join(__dirname, '../uploads'));
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        // cb(null,Date.now() + '--' + file.originalname);
        cb(null,uniqueSuffix+'.jpg');
    },
});

const upload3 = multer({ storage: fileStorageEngine3 });

module.exports = { upload , upload2 , upload3 };