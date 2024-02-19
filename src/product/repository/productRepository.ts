import {Model, isValidObjectId} from "mongoose"
import { Product } from "../model/productSchema"
import { CreateProductDTO } from "../DTO/createProductDto"
import {UpdateProductDTO} from "../DTO/updateProductDto"
import { IProductRepository } from "./productRepositoryInterface"

export class ProductRepository implements IProductRepository{
    constructor (private productSchema: Model <Product>){}
    async getAll(): Promise <Product[]>{
        const products= await this.productSchema.find({jewelsAmount:{$gt:0}})
        return products
    }
    async getById(prodId:string): Promise <Product | null>{
        const product= await this.productSchema.findOne({_id:prodId, deleteAt:null})
        return product
    }
    async create(product: CreateProductDTO): Promise<Product | null>{
        const newProduct= await this.productSchema.create(product)
        return newProduct
    }
    async update(prodId: string, newProductData: UpdateProductDTO): Promise<Product | null>{
        if(!isValidObjectId(prodId)){
            throw new Error(`Id ${prodId} is not valid.`)
        }

        const updatedProduct = await this.productSchema.findByIdAndUpdate(prodId, newProductData, { new: true })
        return updatedProduct
    }
    async softDelete(prodId: string): Promise<Product | null>{
        if(!isValidObjectId(prodId)){
            throw new Error(`Id ${prodId} is not valid.`)
        }

        const deletedProduct = await this.productSchema.findByIdAndUpdate(prodId, { deletedAt: new Date() }, { new: true })
        return deletedProduct
    }
    // async redeem(prodId: string, jewelsAmount: number): Promise< Product | null>{

    // }
}
