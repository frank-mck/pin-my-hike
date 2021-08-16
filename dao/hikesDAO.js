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
} 