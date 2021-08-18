import express from "express"
import HikesCtrl from "./hikes.controller.js"
import ReviewsCtrl from "./reviews.controller.js"
import multer, { diskStorage } from 'multer'
const router = express.Router()

// define image storage 

const storage = multer.diskStorage({

// destination for files
destination:function (request, file, callback) {
  callback(null, '../client/public/uploads/images')
},

// add back the extension
filename:function(request, file, callback) {
  callback(null, Date.now() + file.originalname)
  },
})


// upload parameters 
const upload = multer({
  storage:storage,
  limits:{
    filesize:1024*1024*3
  },
})


router.route("/").get(HikesCtrl.apiGetHikes)
router.route("/id/:id").get(HikesCtrl.apiGetHikeById)

router.route("/new", upload.single('image')).post(HikesCtrl.apiPostHike)

router.route("/review").post(ReviewsCtrl.apiPostReview)

export default router