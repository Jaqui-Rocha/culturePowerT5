import { Request, Response } from "express";
import { IUserService } from "../service/userServiceInterface";
import { createUserValidator } from "../utils/createUserValidator";
import { IUserController } from "./userControllerInterface";
//import { adminMiddleware } from "../../middleware/adminMiddleware";

export class UserController implements IUserController{
    constructor(private userService: IUserService){}

    async getAll(req: Request, res: Response): Promise<void>{
        try {            
            const users = await this.userService.getAll()
            res.status(200).json(users)
        } catch (error: any) {
            res.status(500).json({ message: error.message || 'Ocorreu um erro inesperado.' })
        }
    }

    // async getByEmail(req: Request, res: Response): Promise<void>{
    //     try {
    //         const { email } = req.query
    //         const user = await this.userService.getByEmail(email as string)
    //         res.status(200).json(user)
    //     } catch (error: any) {
    //         res.status(500).json({ message: error.message || 'Ocorreu um erro inesperado.' })
    //     }
    // }

    async getById(req: Request, res: Response): Promise<void>{
        try {
            const { id } = req.params
            const user = await this.userService.getById(id)
            res.status(200).json(user)
        } catch (error: any) {
            res.status(500).json({ message: error.message || 'Ocorreu um erro inesperado.' })
        }
    }

    async create(req: Request, res: Response): Promise<void>{
        try {
            const { body } = req
            await createUserValidator.validate(body, { abortEarly: false })

            const user = await this.userService.create(body)
            res.status(201).json(user)
        } catch (error: any) {
            res.status(500).json({ message: error.message || 'Ocorreu um erro inesperado.' })
        }
    }
 
    async update(req: Request, res: Response): Promise<void>{
        try {
            const { id } = req.params
            const { body } = req

            const updatedUser = await this.userService.update(id, body)
            res.status(200).json(updatedUser)
        } catch (error: any) {
            res.status(500).json({ message: error.message || 'Ocorreu um erro inesperado.' })
        }
    }
    async softDelete(req: Request, res: Response): Promise<void>{
        try {
            const { id } = req.params
            //const {role} = req.body 
            
            const deletedUser = await this.userService.softDelete(id)
                       
            res.status(200).json(deletedUser)
        
        } catch (error: any) {
            res.status(500).json({ message: error.message || 'Ocorreu um erro inesperado.' })
        }
    }
}