import { CreateProductDTO } from "../DTO/createProductDto"
import { UpdateProductDTO } from "../DTO/updateProductDto"
import { Product } from "../model/productSchema"

export interface IProductService {
    getAll(): Promise<Array<Product>>

    getById(prodId: string): Promise<Product>

    create(productData: CreateProductDTO): Promise<Product>

    update(prodId: string, newProductData: UpdateProductDTO): Promise<Product>

    softDelete(prodId: string): Promise<Product>
}