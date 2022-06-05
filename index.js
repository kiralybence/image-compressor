const express = require('express')
const multer = require('multer')
const sharp = require('sharp')
const app = express()
const upload = multer({ storage: multer.memoryStorage() })

app.post('/api/compress', upload.single('image'), async (req, res) => {
    let image = sharp(req.file.buffer)

    if (req.query['format']) {
        image = image.toFormat(req.query['format'], JSON.parse(req.query['options'] ?? '{}'))
        res.contentType(`image/${req.query['format']}`)
    } else {
        image = image.jpeg({ quality: 50, mozjpeg: true })
        res.contentType('image/jpeg')
    }

    if (req.query['withMetadata']) {
        image = image.withMetadata()
    }

    res.send(await image.toBuffer())
})

app.listen(3000)