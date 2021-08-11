const express = require('express')
const router = express.Router()

router.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});

router.get('/new', (req, res) => {
  
});

router.get('/edit/:id', async (req, res) => {
  
});


router.delete('/:id', async (req, res) => {
  
})

router.put('/:id', async (req, res) => {
  
})

router.post('/', async (req, res, next) => {
  
})


module.exports = router