import { Product } from "../model/productSchema";
import { CreateProductDTO } from "../DTO/createProductDto";
import { UpdateProductDTO } from "../DTO/updateProduct";
export interface IProductRepository{
    getAll(): Promise<Array<Product>>

    getByEmail(email: string): Promise<Product | null>

    getById(id: string): Promise<Product | null>

    create(userData: CreateProductDTO): Promise<Product | null>

    update(id: string, newProductData: UpdateProductDTO): Promise<Product | null>

    softDelete(id: string): Promise<Product | null>
}