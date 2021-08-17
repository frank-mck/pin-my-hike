import express from "express"
import cors from "cors"
import hikes from "./api/hikes.route.js"




// const multer = require('multer')

// const fileStorageEngine = multer.diskStorage({
//   destination: (req, res, cb) => {
//     cb(null, './images')
//   },
//   filename: (req, res, cb) => {
//     cb(null, Date.now() + '--' + file.originalname)
//   }
// })

// const upload = multer({storage : fileStorageEngine})

// app.post("/single", upload.single('image'),(res,
// res) => {
//   console.log(req.file)
//   res.send('Single file upload successful')
// })

const app = express()

app.use(cors())

app.use(express.json())

app.use("/api/v1/hikes", hikes)

app.use("*", (req, res) => res.status(404).json({ error: "not found" }))

export default app 