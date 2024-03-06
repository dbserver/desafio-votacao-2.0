import { IsEmail, IsEnum, IsNotEmpty, IsString, Length, Validate, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import { testCpf } from "../utils/validDocuments.util"
import { UserPermission } from "../enum/user.enum";

@ValidatorConstraint({
    name: 'CPF',
    async: false
})
class Cpf implements ValidatorConstraintInterface {
    validate(value: string) {
        value = value.replace(/[^0-9]/g, '')
        const len = value.length

        if(!(len === 11 || len === 14)) return false

        return testCpf(value)
    }

    defaultMessage() {
        return 'Cpf!'
    }
}

export class UserSchema {
    @IsNotEmpty()
    @Length(2, 255)
    name!: string

    @IsNotEmpty()
    @Length(8, 24)
    @IsString()
    password!: string

    @IsEmail()
    email!: string

    @IsNotEmpty()
    @Length(10, 14)
    @IsString()
    @Validate(Cpf)
    document!: string

    @IsNotEmpty()
    @IsEnum(UserPermission)
    permission!: UserPermission
}

export class UserAuthSchema {
    @IsNotEmpty()
    @Length(10, 14)
    @IsString()
    @Validate(Cpf)
    document!: string

    @IsNotEmpty()
    @Length(8, 24)
    @IsString()
    password!: string
}