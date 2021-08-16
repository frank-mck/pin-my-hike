import app from "./server.js"
import mongodb from "mongodb"
import dotenv from "dotenv"
import HikesDAO from "./dao/hikesDAO.js"

dotenv.config()

const MongoClient = mongodb.MongoClient

const port = 3002 || 8000

MongoClient.connect(
  process.env.PIN_MY_HIKES_DB_URI,
  { 
    maxPoolSize: 50,
    wtimeoutMS: 2500,
    useNewUrlParser: true
  }
)
.catch(err => {
  console.error(err.stack)
  process.exit(1)
})
.then(async client => {
  await HikesDAO.injectDB(client)
  app.listen(port, () => {
    console.log(`listening on port ${port}`)
  })
})
