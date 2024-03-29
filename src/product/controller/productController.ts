import { Request, Response } from "express";
import { IProductService } from "../service/productServiceInterface";
import { createProductValidator } from "../utils/createProductValidator";
import { IProductController } from "./productControllerInterface"
export class ProductController implements IProductController{
    constructor(private productService: IProductService){}

    async getAll(req: Request, res: Response): Promise<void>{
        try {
            const products = await this.productService.getAll()
            res.status(200).json(products)
        } catch (error: any) {
            res.status(500).json({ message: error.message || 'Ocorreu um erro inesperado.' })
        }
    }

    async getById(req: Request, res: Response): Promise<void>{
        try {
            const { prodId } = req.params
            const product = await this.productService.getById(prodId)
            res.status(200).json(product)
        } catch (error: any) {
            res.status(500).json({ message: error.message || 'Ocorreu um erro inesperado.' })
        }
    }

    async create(req: Request, res: Response): Promise<void>{
        try {
            const { body } = req
            await createProductValidator.validate(body, { abortEarly: false })

            const product = await this.productService.create(body)
            res.status(201).json(product)
        } catch (error: any) {
            res.status(500).json({ message: error.message || 'Ocorreu um erro inesperado.' })
        }
    }
    
    async update(req: Request, res: Response): Promise<void>{
        try {
            const { prodId } = req.params
            const { body } = req

            const updatedProduct = await this.productService.update(prodId, body)
            res.status(200).json(updatedProduct)
        } catch (error: any) {
            res.status(500).json({ message: error.message || 'Ocorreu um erro inesperado.' })
        }
    }
    async softDelete(req: Request, res: Response): Promise<void>{
        try {
            const { prodId } = req.params
            const deletedProduct = await this.productService.softDelete(prodId)
            res.status(200).json(deletedProduct)
        } catch (error: any) {
            res.status(500).json({ message: error.message || 'Ocorreu um erro inesperado.' })
        }
    }
    async redeem(req: Request, res: Response): Promise<void> {
        
    }
}