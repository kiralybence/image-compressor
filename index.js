const express = require('express')
const multer = require('multer')
const sharp = require('sharp')
const app = express()
const upload = multer({ storage: multer.memoryStorage() })

app.post('/api/compress', upload.single('image'), async (req, res) => {
    const image = await sharp(req.file.buffer)
        .jpeg({ quality: 50 })
        .withMetadata()
        .toBuffer()

    res.contentType('image/jpeg')
    res.send(image)
})

app.listen(3000)