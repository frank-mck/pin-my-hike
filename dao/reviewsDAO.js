import mongodb from "mongodb"
const ObjectId = mongodb.ObjectId

let reviews

export default class ReviewsDAO {
  static async injectDB(conn) {
    if (reviews) {
      return
    }
    try {
      reviews = await conn.db(process.env.RESTREVIEWS_NS).collection("reviews")
    } catch (e) {
      console.error(`Unable to establish collection handle in reviewsDAO: ${e}`)
    }
  }

  static async addReview(hikeId, rating, date) {
    try {
      const reviewDoc = { 
          date: date,
          rating: rating,
          hike_id: ObjectId(hikeId), }

      return await reviews.insertOne(reviewDoc)
    } catch (e) {
      console.error(`Unable to post review: ${e}`)
      return { error: e }
    }
  }
}
