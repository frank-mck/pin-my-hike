import HikesDAO from "../dao/hikesDAO.js"

export default class HikesController {
  static async apiGetHikes(req, res, next) {
    const hikesPerPage = req.query.hikesPerPage ? parseInt(req.query.hikesPerPage, 10) : 20
    const page = req.query.page ? parseInt(req.query.page, 10) : 0

    let filters = {}
    if (req.query.title) {
      filters.title = req.query.title
    }

    const { hikesList, totalNumHikes } = await HikesDAO.getHikes({
      filters,
      page,
      hikesPerPage,
    })

    let response = {
      hikes: hikesList,
      page: page,
      filters: filters,
      entries_per_page: hikesPerPage,
      total_results: totalNumHikes,
    }
    res.json(response)
  }

  static async apiPostHike(req, res, next) {
    try {
      const lng = req.body.lng
      const lat = req.body.lat
      const title = req.body.title
      const description = req.body.description
      const date = new Date()
      const image = req.body.image

      // this sends the data to the database with addHike.
      const HikeResponse = await HikesDAO.addHike(
        lng,
        lat,
        title,
        description,
        date,
        image
      )
      res.json({ status: "success" })
    } catch (e) {
      // error message if it doesnt work
      res.status(500).json({ error: e.message })
    }
  }

  static async apiGetHikeById(req, res, next) {
    try {
      let id = req.params.id || {}
      let hike = await HikesDAO.getHikeByID(id)
      if (!hike) {
        res.status(404).json({ error: "Not found" })
        return
      }
      res.json(hike)
    } catch (e) {
      console.log(`api, ${e}`)
      res.status(500).json({ error: e })
    }
  }

}
