import ReviewsDAO from "../dao/reviewsDAO.js"

export default class ReviewsController {
  static async apiPostReview(req, res, next) {
    try {
      const hikeId = req.body.hike_id
      const rating = req.body.rating
      const date = new Date()

      const ReviewResponse = await ReviewsDAO.addReview(
        hikeId,
        rating,
        date,
      )
      res.json({ status: "success" })
    } catch (e) {
      // error message if it doesnt work
      res.status(500).json({ error: e.message })
    }
  }

}