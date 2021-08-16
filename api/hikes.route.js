import express from "express"
import HikesCtrl from "./hikes.controller.js"

const router = express.Router()

router.route("/").get(HikesCtrl.apiGetHikes)

router
  .route("/new")
  .post(HikesCtrl.apiPostHike)

export default router