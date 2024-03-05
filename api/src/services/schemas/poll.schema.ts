import { IsArray, IsDate, IsDateString, IsNotEmpty, IsOptional, Length } from "class-validator"
import { QuillOps } from "../interface/quill.interface"

export class PollSchema {
    @IsNotEmpty()
    @Length(2, 255)
    text!: string

    @IsArray()
    @IsOptional()
    ops?: QuillOps[]

    @IsDateString()
    @IsOptional()
    expiresAt?: Date
}