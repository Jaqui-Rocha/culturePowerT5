import {Schema, InferSchemaType, Model, model, Types} from "mongoose"
import { role } from "../utils/roles"
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
    photo: String,
    role: {
        type: String,
        enum: Object.values(role)      
    },
    deleteAt:{
        type: Date,
        default: null
    },
    jewelsAmount: Number,
    products: [{
        type: Types.ObjectId,
        ref: 'Product'
    }],
    favoriteProducts: [{
        type: Types.ObjectId,
        ref: 'Product'
    }]

}, { timestamps: true })

export type User = InferSchemaType<typeof userSchema>

export const UserModel: Model<User> = model('User', userSchema)