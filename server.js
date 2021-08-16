import express from 'express';
const app = express();
import hikesRouter from './routes/hikes';
import Hikes from './models/hikes';
import mongoose from 'mongoose';
import methodOverride from 'method-override';

mongoose.connect('mongodb://localhost/pin-my-hike', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

const db = mongoose.connection;
db.on('error', (error) => console.log(error));
db.once('open', () => console.log('Connected to mongoose'));

app.use(express.urlencoded({extended: false}));
app.use(methodOverride('_method'));
app.set('view engine', 'ejs');

app.get('/', async (req, res) => {
  const hike = await Hikes.find(req.pins);
  res.render('./hikes/index', {hike: hike});
});

app.post('/', async (req, res, next) => {
  req.pins = await new Hikes();
  next();
}, savePinAndRedirect('/'));

app.use('/hikes', hikesRouter);

app.listen(3001)
