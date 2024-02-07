import { ProductController } from "../controller/productController";
import { ProductModel } from "../model/productSchema";
import { ProductRepository } from "../repository/productRepository";
import { ProductService } from "../service/productService";

class ProductFactory {
    static getInstance(){
        const productRepository = new ProductRepository(ProductModel)
        const productService = new ProductService(productRepository)
        const productController = new ProductController(productService)
        return productController
    }
}

export const productModule = ProductFactory.getInstance()