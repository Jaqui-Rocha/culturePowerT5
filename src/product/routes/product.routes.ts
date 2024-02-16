import { Router } from "express";
import { ProductModule } from "../factory/productFactory";


export const productRoutes= Router()

productRoutes.get("/",ProductModule.getAll.bind(ProductModule))

productRoutes.get("/product/:id", ProductModule.getById.bind(ProductModule))

productRoutes.post("/product", ProductModule.create.bind(ProductModule))

productRoutes.put("/product/:id", ProductModule.update.bind(ProductModule))

productRoutes.get("/product/delete/:id", ProductModule.softDelete.bind(ProductModule))
