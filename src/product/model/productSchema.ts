import {Schema, InferSchemaType, Model, model, Types} from "mongoose"
const productSchema= new Schema({
    name:{
        type: String,
        required: true
    },
    value:{
        type: String,
        required: true
    },
    amount:{
        type: Number,
        required: true
    },
    description:{
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
})
export type Product = InferSchemaType<typeof productSchema>

export const ProductModel: Model<Product> = model('Product', productSchema)