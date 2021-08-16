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
}
