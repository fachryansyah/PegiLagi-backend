const Sample = require('../../Models/SampleModel')

const SampleController = {
    test: async (req, res) => {
        const planes = await Sample.query()
        res.json(planes)
    }
}

module.exports = SampleController