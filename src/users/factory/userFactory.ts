import { UserController } from "../controller/userController";
import { UserModel } from "../model/userSchema";
import { UserRepository } from "../repository/userRepository";
import { UserService } from "../service/userService";

class UserFactory {
    static getInstance(){
        const userRepository = new UserRepository(UserModel)
        const userService = new UserService(userRepository)
        const userController = new UserController(userService)
        return userController
    }
}

export const userModule = UserFactory.getInstance()