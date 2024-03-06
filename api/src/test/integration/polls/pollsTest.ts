import { createPollOptionUserTest } from "./createPollOptionUserTest"
import { createPollTest } from "./createPollTest"
import { getPollsTest } from "./getPollsTest"

export const pollTest = () => describe('Poll test', () => {
    createPollTest()
    getPollsTest()
    createPollOptionUserTest()
})