import { CreateProductDTO } from "../DTO/createProductDto";
import { UpdateProductDTO } from "../DTO/updateProductDto";
import { Product } from "../model/productSchema";
import { IProductRepository } from "../repository/productRepositoryInterface";
import { IProductService } from "./productServiceInterface";


export class ProductService implements IProductService{
    constructor(private productRepository: IProductRepository){}

    async getAll(): Promise<Product[]>{
        const products = await this.productRepository.getAll()

        if(!products || products.length ===0){
            throw new Error('Products not found.')
        }

        return products
    }

    async getById(prodId: string): Promise<Product>{
        const product = await this.productRepository.getById(prodId)

        if(!product){
            throw new Error('Product not found.')
        }

        return product
    }
    
    async create(productData: CreateProductDTO): Promise<Product>{
       
        const newProduct = await this.productRepository.create(productData)

        if(!newProduct){
            throw new Error('Cannot create product.')
        }

        return newProduct
    }

    async update(prodId: string, newProductData: UpdateProductDTO): Promise<Product>{
        const product = await this.productRepository.getById(prodId)

        if(!product){
            throw new Error('Product not found.')
        }

        const updatedProduct = await this.productRepository.update(prodId, newProductData)

        if(!updatedProduct){
            throw new Error('Cannot update roduct.')
        }

        return product
    }

    async softDelete(prodId: string): Promise<Product>{
        const product = await this.productRepository.getById(prodId)

        if(!product){
            throw new Error("Product not found.")
        }

        const deletedProduct = await this.productRepository.softDelete(prodId)

        if(!deletedProduct){
            throw new Error("Cannot delete product.")
        }

        return deletedProduct
    }
}