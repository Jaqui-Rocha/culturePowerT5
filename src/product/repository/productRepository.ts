import {Model, isValidObjectId} from "mongoose"
import { Product } from "../model/productSchema"
import { CreateProductDTO } from "../DTO/createProductDto"
import {UpdateProductDTO} from "../../product/DTO/updateProduct"
import { IProductRepository } from "./productRepositoryInterface"

export class ProductRepository implements IProductRepository{
    constructor (private productSchema: Model <Product>){}
    async getAll(): Promise <Product[]>{
        const products= await this.productSchema.find({deletedAt: null}).populate('Users')
        return products
    }
    async getByEmail(email:string): Promise<Product | null>{
        const product= await this.productSchema.findOne({
            email: email, deletAt:null
        }).populate('Users')
        return product
    }
    async getById(id:string): Promise <Product | null>{
        const product= await this.productSchema.findOne({_id:id, deleteAt:null})
        return product
    }
    async create(userData: CreateProductDTO): Promise<Product | null>{
        const newProduct= await this.productSchema.create(userData)
        return newProduct
    }
    async update(id: string, newUserData: UpdateProductDTO): Promise<Product | null>{
        if(!isValidObjectId(id)){
            throw new Error(`Id ${id} is not valid.`)
        }

        const updatedProduct = await this.productSchema.findByIdAndUpdate(id, newUserData, { new: true })
        return updatedProduct
    }
    async softDelete(id: string): Promise<Product | null>{
        if(!isValidObjectId(id)){
            throw new Error(`Id ${id} is not valid.`)
        }

        const deletedProduct = await this.productSchema.findByIdAndUpdate(id, { deletedAt: new Date() }, { new: true })
        return deletedProduct
    }
}
