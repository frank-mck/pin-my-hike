import express from "express"
import HikesCtrl from "./hikes.controller.js"

const router = express.Router()

router.route("/").get(HikesCtrl.apiGetHikes)

router
  .route("/hike")
  .post(HikesCtrl.apiPostHike)
  .put(HikesCtrl.apiUpdateHike)
  .delete(HikesCtrl.apiDeleteHike)

export default router