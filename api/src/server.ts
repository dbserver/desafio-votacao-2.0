import cors from 'cors'
import express from "express"
import swaggerUi from 'swagger-ui-express'
import v1 from "./routers/v1/v1.router"
import Database from "./services/dataBase/database"
import swaggerDocs from './swagger.json'

require("custom-env").env(true)

const app = express()
const port = process.env.PORT || 8081

app.use(express.json())
app.use(cors())

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs))
app.use('/v1', v1)

Database.Init().then(() => {
    app.listen(port, () => { console.log('listening on ', port) })
})