import { CreateUserDTO } from "../DTO/createUserDto"
import { UpdateUserDTO } from "../DTO/updateUserDto"
import { User } from "../model/userSchema"

export interface IUserService {
    getAll(): Promise<Array<User>>

    getById(id: string): Promise<User>

    create(userData: CreateUserDTO): Promise<User>

    update(id: string, newUserData: UpdateUserDTO): Promise<User>

    softDelete(id: string): Promise<User>
}