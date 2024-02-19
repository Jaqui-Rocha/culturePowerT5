import { Router } from "express";
import { ProductModule } from "../factory/productFactory";
import { AuthMiddleware } from "../../middleware/authMiddleware";

export const productRoutes= Router()

productRoutes.get("/",AuthMiddleware.handler.bind(AuthMiddleware), ProductModule.getAll.bind(ProductModule))

productRoutes.get("/product/:id", AuthMiddleware.handler.bind(AuthMiddleware), ProductModule.getById.bind(ProductModule))

productRoutes.post("/product", AuthMiddleware.handler.bind(AuthMiddleware), ProductModule.create.bind(ProductModule))

productRoutes.put("/product/:id", ProductModule.update.bind(ProductModule))

productRoutes.get("/product/delete/:id", AuthMiddleware.handler.bind(AuthMiddleware), ProductModule.softDelete.bind(ProductModule))
