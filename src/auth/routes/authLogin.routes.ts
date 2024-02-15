import { Router } from "express";
import { Login } from "../factory/loginUser"; 
import { AuthMiddleware } from "../../middleware/authMiddleware"; 
//import { AuthMiddleware } from "../../../Middlewares/Auth-login-middleware";


export const userRouterLogin = Router()

userRouterLogin.post('/login', Login.login.bind(Login))