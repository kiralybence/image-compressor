const express = require('express')
const multer = require('multer')
const sharp = require('sharp')
const app = express()
const upload = multer({ storage: multer.memoryStorage() })

app.post('/api/compress', upload.single('image'), async (req, res) => {
    let image = sharp(req.file.buffer)

    if (req.query['format']) {
        let options = req.query['formatOptions']
            ? JSON.parse(req.query['formatOptions'])
            : {}

        image = image.toFormat(req.query['format'], options)
        res.contentType(`image/${req.query['format']}`)
    } else {
        image = image.jpeg({ mozjpeg: true })
        res.contentType('image/jpeg')
    }

    if (req.query['resize']) {
        let options = req.query['resizeOptions']
            ? JSON.parse(req.query['resizeOptions'])
            : { width: 1080, height: 1080, withoutEnlargement: true, fit: sharp.fit.inside }

        image = image.resize(options)
    }

    if (req.query['withMetadata']) {
        image = image.withMetadata()
    }

    res.send(await image.toBuffer())
})

app.listen(3000)