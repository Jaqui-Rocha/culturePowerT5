import { CreateProductDTO } from "../DTO/createProductDto";
import { UpdateProductDTO } from "../DTO/updateProductDto";
import { Product } from "../model/productSchema";
import { IProductRepository } from "../repository/productRepositoryInterface";
import { IProductService } from "./productServiceInterface";
import bcrypt from 'bcrypt'

export class ProductService implements IProductService{
    constructor(private productRepository: IProductRepository){}

    async getAll(): Promise<Product[]>{
        const products = await this.productRepository.getAll()

        if(!products || products.length ===0){
            throw new Error('Products not found.')
        }

        return products
    }

    async getByEmail(email: string): Promise<Product>{
        const product = await this.productRepository.getByEmail(email)

        if(!product){
            throw new Error('Product not found.')
        }

        return product
    }

    async getById(id: string): Promise<Product>{
        const product = await this.productRepository.getById(id)

        if(!product){
            throw new Error('Product not found.')
        }

        return product
    }
    
    async create(productData: CreateProductDTO): Promise<Product>{
        productData.password = await bcrypt.hash(productData.password, 8)
        const newProduct = await this.productRepository.create(productData)

        if(!newProduct){
            throw new Error('Cannot create product.')
        }

        return newProduct
    }

    async update(id: string, newProductData: UpdateProductDTO): Promise<Product>{
        const product = await this.productRepository.getById(id)

        if(!product){
            throw new Error('Product not found.')
        }

        const updatedProduct = await this.productRepository.update(id, newProductData)

        if(!updatedProduct){
            throw new Error('Cannot update roduct.')
        }

        return product
    }

    async softDelete(id: string): Promise<Product>{
        const product = await this.productRepository.getById(id)

        if(!product){
            throw new Error("Product not found.")
        }

        const deletedProduct = await this.productRepository.softDelete(id)

        if(!deletedProduct){
            throw new Error("Cannot delete product.")
        }

        return deletedProduct
    }
}