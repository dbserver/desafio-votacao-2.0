import { validate } from "class-validator";
import { APIError } from "../../@types/types";

export async function validateAndThrow(data: Object) {
    const errors = await validate(data, { whitelist: true })
    if (errors.length > 0) {
        throw new APIError(
            'Error in validate data!',
            'val001',
            errors.join("; "),
            422,
            data
        );
    }
}
