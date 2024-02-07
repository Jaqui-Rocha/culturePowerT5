import { Router } from "express";
import { UserModule } from "../factory/userFactory";


export const userRoutes= Router()
userRoutes.get("/user",UserModule.getAll.bind(UserModule))
userRoutes.get("/user/:id", UserModule.getById.bind(UserModule))
userRoutes.get("/user/find", UserModule.getByEmail.bind(UserModule))
userRoutes.post("/user", UserModule.create.bind(UserModule))
userRoutes.put("/user/:id", UserModule.update.bind(UserModule))
userRoutes.get("/user/delete/:id", UserModule.softDelete.bind(UserModule))
