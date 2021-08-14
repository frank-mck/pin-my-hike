const express = require("express");
const app = express();
const hikesRouter = require('./routes/hikes')
const Hikes = require('./models/hikes')
const mongoose = require('mongoose')
const methodOverride = require('method-override')

mongoose.connect("mongodb://localhost/pin-my-hike", { 
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true 
})

const db = mongoose.connection
db.on('error', error => console.log(error))
db.once('open', () => console.log('Connected to mongoose'))

app.use(express.urlencoded({ extended: false }))
app.use(methodOverride('_method'))
app.set('view engine', 'ejs')

const savePinAndRedirect = (path) => {
  return async (req, res) => {
    let pins = req.pins
    pins.title = req.body.title
    pins.description = req.body.description
    pins.location = req.body.location
    try {
      pins = await pins.save()
    } catch (e) {
      res.redirect(`${path}`, { pins: pins })
    }
  }
}


app.get('/', async (req, res) => {
  const hike = await Hikes.find(req.pins)
  res.render('./hikes/index', { hike: hike })
})

app.post('/', async (req, res, next) => {
  req.pins = await new Hikes();
  next();
}, savePinAndRedirect('/'))


app.use("/hikes", hikesRouter);

app.listen(3001, () => {
  console.log(`Server listening on ${process.env.PORT}`);
});
