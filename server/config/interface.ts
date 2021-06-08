import { Document } from 'mongoose'

export interface IUser extends Document {
    name:string
    account:string
    password:string
    avatar:string
    role:string
    type:string
    _doc:object
}

export interface InewUser {
    name : string
    account : string
    password : string
}

export interface IToken extends InewUser {
    newUser:InewUser
    iat: number,
    exp: number
}

export interface IDecodedToken {
    id?:string
    newUser?:InewUser
    iat:number
    exp:number
}