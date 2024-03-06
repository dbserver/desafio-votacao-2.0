import { IsArray, IsDateString, IsNotEmpty, IsOptional, Length } from "class-validator"
import { QuillOps } from "../interface/quill.interface"

export class PollSchema {
    @IsNotEmpty()
    @Length(2, 1000)
    text!: string

    @IsNotEmpty()
    @Length(5, 15)
    category!: string

    @IsArray()
    @IsOptional()
    ops?: QuillOps[]

    @IsDateString()
    expiresAt!: Date
}