import { User } from "../model/userSchema";
import { CreateUserDTO } from "../DTO/createUserDto";
import { UpdateUserDTO } from "../DTO/updateUserDto";

export interface IUserRepository{
    getAll(): Promise<Array<User>>

    getByEmail(email: string): Promise<User | null>

    getById(id: string): Promise<User | null>

    create(userData: CreateUserDTO): Promise<User | null>

    update(id: string, newUserData: UpdateUserDTO): Promise<User | null>

    softDelete(id: string): Promise<User | null>
}