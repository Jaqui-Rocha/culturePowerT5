import { Product } from "../model/productSchema";
import { CreateProductDTO } from "../DTO/createProductDto";
import { UpdateProductDTO } from "../DTO/updateProductDto";
export interface IProductRepository{
    getAll(): Promise<Array<Product>>

    getById(prodId: string): Promise<Product | null>

    create(userData: CreateProductDTO): Promise<Product | null>

    update(prodId: string, newProductData: UpdateProductDTO): Promise<Product | null>

    softDelete(prodId: string): Promise<Product | null>

    //redeem ( prodId: string, jewelsAmount: number): Promise< Product | null>
}