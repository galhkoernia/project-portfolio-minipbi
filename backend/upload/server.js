// backend/server.js
// backend/upload/server.js
const express = require('express');
const cors = require('cors');
const path = require('path');
const upload = require('./upload');
const app = express();
const PORT = 3000;

app.use(cors());
const fs = require('fs');
const path = require('path');

app.get('/files/:category', (req, res) => {
    const category = req.params.category;
    const dirPath = path.join(__dirname, `../documents/${category}`);

    fs.readdir(dirPath, (err, files) => {
        if (err) {
            return res.status(500).json({ message: 'Gagal membaca folder.' });
        }

        const fileUrls = files.map(file => ({
            name: file,
            url: `/documents/${category}/${file}`
        }));

        res.json(fileUrls);
    });
});

app.use(express.static(path.join(__dirname, '../documents')));

app.post('/upload/:category', upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'File tidak ditemukan!' });
    }

    return res.status(200).json({
        message: 'File berhasil diunggah!',
        filePath: `/documents/${req.params.category}/${req.file.filename}`,
    });
});

app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});
