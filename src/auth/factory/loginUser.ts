
import { UserModel } from "../../users/model/userSchema" 
import { UserRepository } from "../../users/repository/userRepository" 
import { AuthController } from "../controller/authController"
import { AuthService } from "../service/authService"

export const AuthLogin = ()=>{

    const repository = new UserRepository(UserModel)
    const service = new AuthService(repository)
    const controller = new AuthController(service)

    return controller
}

export const Login = AuthLogin()