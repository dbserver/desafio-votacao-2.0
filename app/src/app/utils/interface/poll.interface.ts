import { DeltaOperation } from "quill"
import { UserAuth } from "./auth.interface"

export interface PollDto {
    text: string
    ops?: []
    expiresAt?: Date
}

export interface PollComplete extends Poll{
    expired: boolean
    option?: string
}

export interface Poll {
    id: number
    text: string
    ops?: DeltaOperation[]
    answers: number
    expiresAt: Date
    createdByUserId: number
    createdByUser: UserAuth
    pollsOptions?: PollOption[]
    pollsOptionsUsers?: PollOptionUser[]
    readonly createdAt: Date
    readonly updatedAt: Date   
}

export interface PollOption {
    id: number
    option: string
    selectCount: number
    pollId: number
    poll?: Poll
    pollsOptionsUsers?: PollOptionUser[]
    readonly createdAt: Date
    readonly updatedAt: Date
}

export interface PollOptionUser {
    pollOptionId: number
    pollOption?: PollOption
    userId: number
    user: UserAuth
    pollId: number
    poll?: Poll
    readonly createdAt: Date
    readonly updatedAt: Date
}

