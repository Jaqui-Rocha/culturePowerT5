import { Router } from "express";
import { Login } from "../factory/loginUser"; 
import { LoginAdmin } from "../factory/loginAdmin";
//import { validateAdmin } from "../../middleware/adminMiddleware";



export const userRouterLogin = Router()

userRouterLogin.post('/login', Login.login.bind(Login))
// Login admin
userRouterLogin.post('/loginAdmin', LoginAdmin.login.bind(LoginAdmin))