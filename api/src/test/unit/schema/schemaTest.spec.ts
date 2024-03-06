import { userAuthSchemaTest } from "./userAuthSchemaTest"
import { userSchemaTest } from "./userSchemaTest"

describe('Schemas', () => {
    userSchemaTest()
    userAuthSchemaTest()
})