const express = require("express");
const app = express();
const hikesRouter = require('./routes/hikes')
const Hikes = require('./models/hikes')
const mongoose = require('mongoose')
//const methodOverride = require('method-override')

mongoose.connect('mongodb://localhost/hikes', { useUnifiedTopology: true }, { useNewUrlParser: true }, { useUnifiedTopology: true })
const PORT = process.env.PORT || 3001;

app.get('/', async (req, res) => {
  const hikes = await Hikes.find()
  res.json({ hikes: hikes })
})

app.use("/hikes", hikesRouter);

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});