import mongodb from "mongodb"
const ObjectId = mongodb.ObjectId

let hikes;

export default class HikesDAO {
  static async injectDB(conn) {
    if (hikes) {
      return
    }
    try {
      hikes = await conn.db("pin_my_hike").collection("hikes")
    } catch (e) {
      console.error(
        `Unable to establish a collection handle in hikesDAO: ${e}`,
      )
    }
  }

  static async getHikes({
    filters = null,
    page = 0,
    hikesPerPage = 20,
  } = {}) {
    let query
    if (filters) {
      if ("title" in filters) {
        query = { $text: { $search: filters["title"] } }
      }
    }

    let cursor

    try {
      cursor = await hikes
        .find(query)
    } catch (e) {
      console.error(`Unable to issue find command, ${e}`)
      return { hikesList: [], totalNumHikes: 0 }
    }

    const displayCursor = cursor.limit(hikesPerPage).skip(hikesPerPage * page)

    try {
      const hikesList = await displayCursor.toArray()
      const totalNumHikes = await hikes.countDocuments(query)

      return { hikesList, totalNumHikes }
    } catch (e) {
      console.error(
        `Unable to convert cursor to array or problem counting documents, ${e}`,
      )
      return { hikesList: [], totalNumHikes: 0 }
    }
  }

  static async addHike(lng, lat, title, description, date) {
    try {
      const hikeDoc = { lng: lng,
          lat: lat,
          title: title,
          description: description,
          date: date
        }

      return await hikes.insertOne(hikeDoc)
    } catch (e) {
      console.error(`Unable to post review: ${e}`)
      return { error: e }
    }
  }

  static async getHikeByID(id) {
    try {
      const pipeline = [
        {
            $match: {
                _id: new ObjectId(id),
            },
        },
              {
                  $lookup: {
                      from: "reviews",
                      let: {
                          id: "$_id",
                      },
                      pipeline: [
                          {
                              $match: {
                                  $expr: {
                                      $eq: ["$hike_id", "$$id"],
                                  },
                              },
                          },
                          {
                              $sort: {
                                  date: -1,
                              },
                          },
                      ],
                      as: "reviews",
                  },
              },
              {
                  $addFields: {
                      reviews: "$reviews",
                  },
              },
          ]

      return await hikes.aggregate(pipeline).next()
    } catch (e) {
      console.error(`Something went wrong in getRestaurantByID: ${e}`)
      throw e
    }
  }
}
