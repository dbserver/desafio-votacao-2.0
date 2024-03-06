import Database from "../../services/dataBase/database"
import logger from "../../services/logger/logger"

beforeAll(async () => {
    logger.log('info', 'Init test!')
    await Database.Init()
    await Database.startTransaction()
})

afterAll(async () => {
    await Database.rollbackTransaction()
    await Database.destroy()
    logger.log('info', 'Finished test!')
})

