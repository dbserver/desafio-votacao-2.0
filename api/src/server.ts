import express from "express"
import Database from "./services/dataBase/database"
import v1 from "./routers/v1/v1.router"
import cors from 'cors'

require("custom-env").env(true)

const app = express()
const port = process.env.PORT || 8081

app.use(express.json())
app.use(cors())
app.use('/v1', v1)

Database.Init().then(() => {
    app.listen(port, () => { console.log('listening on ', port) })
})