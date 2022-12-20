const mongoose = require('mongoose')

const imageSchema = new mongoose.Schema({
    description:String,
    image:String
})

const imageModel = mongoose.model('image',imageSchema)

module.exports = {
    imageModel
}