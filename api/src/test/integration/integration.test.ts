import { authTest } from "./auth/authTest"
import { pollTest } from "./polls/pollsTest"
import { userTest } from "./users/usersTest"

describe('Integration test',() => {
    userTest()
    authTest()
    pollTest()
})