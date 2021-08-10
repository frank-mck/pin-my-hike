const express = require('express')
const mongoose = require('mongoose')
const app = express()
//const App = require('./client/src/App')
//const Hikes = require('./models/hikes')
const methodOverride = require('method-override')

const PORT = process.env.PORT || 3001;

mongoose.connect('mongodb://localhost/pin-my-hike', {
  useNewUrlParser: true, useUnifiedTopology: true 
})

app.use(express.urlencoded({ extended: false }))
app.use(methodOverride('_method'))
app.set('view engine', 'ejs')

app.get('/', (req, res) => {
  res.render('hikes/index', {text: 'Hello world'})
})

app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});

//app.use('/hikes', hikesRouter)

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})