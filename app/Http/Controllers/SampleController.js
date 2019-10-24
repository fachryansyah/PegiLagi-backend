const Sample = require('../../Models/SampleModel')
const Image = require('../../Providers/Image')

const SampleController = {
    test: async (req, res) => {
        const planes = await Sample.query()
        res.json(planes)
    },
    testUpload: async (req, res) => {
        const image = await Image.upload(req)
        res.json({
            image : image.url
        })
    }
}

module.exports = SampleController