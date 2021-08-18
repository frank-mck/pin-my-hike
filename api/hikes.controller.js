import HikesDAO from "../dao/hikesDAO.js"
import multer, { diskStorage } from 'multer'

// define image storage 

const storage = multer.diskStorage({
  // destination for files
  destination:function (req, file, callback) {
    callback(null, '../client/public/uploads/images')
  },

  // add back the extension
  filename:function(req, file, callback) {
    callback(null, Date.now() + file.originalname)
  },
})

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
      const image = req.file.name
      const date = new Date()

      // this sends the data to the database with addHike.
      const HikeResponse = await HikesDAO.addHike(
        lng,
        lat,
        title,
        description,
        image,
        date
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
