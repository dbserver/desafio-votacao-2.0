import moment from "moment";
import { PollSchema } from "../../services/schemas/poll.schema";
import PollsOptions from "../../entities/PollsOptions.entity";

const pollSchema: PollSchema = {
    text: 'Test' + Date.now(),
    category: 'test',
    expiresAt: moment().utc(true).add(1,'days').toDate()
}

const pollIdMock = {
    id: 0
}

const pollOptionsMock: PollsOptions[] = []

export {
    pollSchema,
    pollIdMock,
    pollOptionsMock
}