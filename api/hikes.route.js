import express from "express"
import HikesCtrl from "./hikes.controller.js"
import ReviewsCtrl from "./reviews.controller.js"

const router = express.Router()

router.route("/").get(HikesCtrl.apiGetHikes)

router.route("/new").post(HikesCtrl.apiPostHike)

router.route("/review").post(ReviewsCtrl.apiPostReview)

export default router