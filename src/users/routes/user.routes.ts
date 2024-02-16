import { Router } from "express";
import { UserModule } from "../factory/userFactory";
import { AuthMiddleware } from "../../middleware/authMiddleware";

export const userRoutes= Router()
userRoutes.get("/users", AuthMiddleware.handler,UserModule.getAll.bind(UserModule))
userRoutes.get("/user/:id", AuthMiddleware.handler, UserModule.getById.bind(UserModule))
userRoutes.get("/user/email", UserModule.getByEmail.bind(UserModule))
userRoutes.post("/user", UserModule.create.bind(UserModule))
userRoutes.put("/user/:id", AuthMiddleware.handler, UserModule.update.bind(UserModule))
userRoutes.get("/user/delete/:id",AuthMiddleware.handler, UserModule.softDelete.bind(UserModule))
