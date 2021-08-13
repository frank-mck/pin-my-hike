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

app.post('/', async (req, res) => {
  return async (req, res) => {
    let hikes = req.hikes
    hikes.title = req.body.title
    hikes.description = req.body.description
    hikes.markdown = req.body.markdown
    try {
      hikes = await hikes.save()
    } catch (e) {
      res.render(`./hikes/index`, { hikes: hikes })
    }
  }
})

app.get('/', (req, res) => {
  const hike = Hikes.find(req.pins)
  console.log(hike)
  res.render('./hikes/index', { hike: hike })
})
app.use("/hikes", hikesRouter);

app.listen(process.env.PORT || 3001, () => {
  console.log(`Server listening on ${process.env.PORT}`);
});

// const saveArticleAndRedirect = (path) => {
//   return async (req, res) => {
//     let article = req.article
//     article.title = req.body.title
//     article.description = req.body.description
//     article.markdown = req.body.markdown
//     try {
//       article = await article.save()
//       res.redirect(`/articles/${article.slug}`)
//     } catch (e) {
//       res.render(`articles/${path}`, { article: article })
//     }
//   }
// }