import {Schema, InferSchemaType, Model, model, Types} from "mongoose"
const userSchema= new Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    photo:{
        type: String,
        required: true
    },
    creatAt: Date,
    updateAt: Date,
    deleteAt: Date,
    jewelsAmount: Number,
    Products:"",
    FavoriteProducts:"",
    Photo: String

})

export type User = InferSchemaType<typeof userSchema>

export const UserModel: Model<User> = model('User', userSchema)