import express from "express"
import Database from "./services/dataBase/database"

require("custom-env").env(true)

const app = express()
const port = process.env.PORT || 8081
app.use(express.json())

app.use('/v1', () => { })

Database.Init().then(() => {
    app.listen(port, () => { console.log('listening on ', port) })
})