import { Request, Response } from "express";
import { adminValidator } from "../utils/adminValidator";
import { IAuthController } from "./authControllerInterface";
import { IAuthService } from "../service/authServiceInterface";

export class AdminAuthController implements IAuthController{
  constructor(private AdminAuthService: IAuthService){}

  async login(req: Request, res: Response): Promise<void> {
    try {
      const { body } = req
      const token = await this.AdminAuthService.login(body)
      await adminValidator.validate(body, {abortEarly: false})

      //const token = await this.authService.login(role)
      res.status(200).json(token)
    } catch (error: any) {
      res.status(500).json({ message: error.message || 'Ocorreu um erro inesperado.' })
    }
  }
}