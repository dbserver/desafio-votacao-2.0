export interface QuillOps {
    insert: {
        mention: {
            id: number
            accountUserId?: number,
            value: string,
            index: number,
            denotationChar: string
        }
    } | string
}