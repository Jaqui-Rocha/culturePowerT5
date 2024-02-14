import {Schema, InferSchemaType, Model, model, Types} from "mongoose"
import { Product } from "../../product/model/productSchema"
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
       // required: true
    },
    creatAt: Date,
    updateAt: Date,
    deleteAt: Date,
    jewelsAmount: Number,
    products: Array<Product>,
    favoriteProducts: Array<Product>
   

})

export type User = InferSchemaType<typeof userSchema>

export const UserModel: Model<User> = model('User', userSchema)