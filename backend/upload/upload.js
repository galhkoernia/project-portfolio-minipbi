// BACKEND.JS
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Kategori folder yang diizinkan
const allowedCategories = ['educational-background', 'achievements', 'projects', 'blog'];

// Validasi ekstensi file
const fileFilter = (req, file, cb) => {
    const allowedTypes = ['.pdf', '.jpg', '.jpeg', '.png', '.docx'];
    const ext = path.extname(file.originalname).toLowerCase();
    if (allowedTypes.includes(ext)) {
        cb(null, true);
    } else {
        cb(new Error('Format file tidak didukung!'));
    }
};

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const category = req.params.category;
        if (!allowedCategories.includes(category)) {
            return cb(new Error('Kategori tidak valid'));
        }

        const dir = path.join(__dirname, `../documents/${category}`);
        fs.mkdirSync(dir, { recursive: true });
        cb(null, dir);
    },
    filename: (req, file, cb) => {
        const timestamp = Date.now();
        const ext = path.extname(file.originalname);
        const filename = `${file.fieldname}-${timestamp}${ext}`;
        cb(null, filename);
    },
});

const upload = multer({ storage, fileFilter });

module.exports = upload;
