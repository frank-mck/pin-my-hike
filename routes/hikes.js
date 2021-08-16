import express from 'express'
const router = express.Router()
import MyMap from '../client/src/components/maps/MyMaps'

router.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});

router.post('/hike', (req, res) => {
  res.json({ location: MyMap });
});

// // router.get('/edit/:id', async (req, res) => {
  
// // });

// // router.delete('/:id', async (req, res) => {
  
// // })

// // router.put('/:id', async (req, res) => {
  
// // })

// // router.post('/', async (req, res, next) => {
  
// // })

// module.exports = router