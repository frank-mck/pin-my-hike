const mongoose = require('mongoose')
//const marked = require('marked')
//const slugify = require('slugify')
//const createDomPurify = require('dompurify')
//const { JSDOM } = require('jsdom')
//const dompurify = createDomPurify(new JSDOM().window)

const hikesSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
  }
})

module.exports = mongoose.model('Hikes', hikesSchema)