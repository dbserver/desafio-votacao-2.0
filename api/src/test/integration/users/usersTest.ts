import { createUserTest } from "./createUserTest"
import { getUserTest } from "./getUserTest"

export const userTest = () => describe('User test', () => {
    createUserTest()
    getUserTest()
})