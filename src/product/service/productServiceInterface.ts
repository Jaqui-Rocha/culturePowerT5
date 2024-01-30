import { CreateProductDTO } from "../DTO/createProductDto"
import { UpdateProductDTO } from "../DTO/updateProductDto"
import { Product } from "../model/productSchema"

export interface IProductService {
    getAll(): Promise<Array<Product>>

    getByEmail(email: string): Promise<Product>

    getById(id: string): Promise<Product>

    create(productData: CreateProductDTO): Promise<Product>

    update(id: string, newProductData: UpdateProductDTO): Promise<Product>

    softDelete(id: string): Promise<Product>
}