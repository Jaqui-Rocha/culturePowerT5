import {Model, isValidObjectId} from "mongoose"
import { User } from "../model/userSchema"
import { CreateUserDTO } from "../DTO/createUserDto"
import {UpdateUserDTO} from "../../users/DTO/updateUserDto"
import { IUserRepository } from "./userRepositoryInterface"

export class UserRepository implements IUserRepository{
    constructor (private userSchema: Model <User>){}
    async getAll(): Promise <User[]>{
        const users= await this.userSchema.find({deletedAt: null}).populate('Products')
        return users
    }
    async getByEmail(email:string): Promise<User | null>{
        const user= await this.userSchema.findOne({
            email: email, deletAt:null
        }).populate('Products')
        return user
    }
    async getById(id:string): Promise <User | null>{
        const user= await this.userSchema.findOne({_id:id, deleteAt:null})
        return user
    }
    async create(userData: CreateUserDTO): Promise<User | null>{
        const newUser= await this.userSchema.create(userData)
        return newUser
    }
    async update(id: string, newUserData: UpdateUserDTO): Promise<User | null>{
        if(!isValidObjectId(id)){
            throw new Error(`Id ${id} is not valid.`)
        }

        const updatedUser = await this.userSchema.findByIdAndUpdate(id, newUserData, { new: true })
        return updatedUser
    }
    async softDelete(id: string): Promise<User | null>{
        if(!isValidObjectId(id)){
            throw new Error(`Id ${id} is not valid.`)
        }

        const deletedUser = await this.userSchema.findByIdAndUpdate(id, { deletedAt: new Date() }, { new: true })
        return deletedUser
    }
}
