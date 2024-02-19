import {Schema, InferSchemaType, Model, model, Types} from "mongoose"
import {v4 as uuidv4} from 'uuid'
const productSchema= new Schema({
    prodId: uuidv4(),
   
    name:{
        type: String,
        required: true
    },
    value:{
        type: String,
        required: true
    },
    jewelsAmount:{
        type: Number,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    photo:{
        type: String,
        required: false
    },
  
}, { timestamps: true })
export type Product = InferSchemaType<typeof productSchema>

export const ProductModel: Model<Product> = model('Product', productSchema)