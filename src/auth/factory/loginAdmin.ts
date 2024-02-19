import { UserModel } from "../../users/model/userSchema" 
import { UserRepository } from "../../users/repository/userRepository" 
import { AdminAuthController } from "../controller/adminAuthController"
import { AuthService } from "../service/authService"

export const AuthLoginAdmin = ()=>{

    const repository = new UserRepository(UserModel)
    const service = new AuthService(repository)
    const controller = new AdminAuthController(service)

    return controller
}

export const LoginAdmin = AuthLoginAdmin()