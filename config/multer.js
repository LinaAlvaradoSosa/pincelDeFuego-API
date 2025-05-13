import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        const nombreUnico = Date.now() + '-' + file.originalname;
        cb(null, nombreUnico);
    }
});

export const upload = multer({ storage });
