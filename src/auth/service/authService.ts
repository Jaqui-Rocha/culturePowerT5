import { IUserRepository } from "../../users/repository/userRepositoryInterface";
import { LoginDTO } from "../dto/loginDto";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { IAuthService } from "./authServiceInterface";

export class AuthService implements IAuthService{
  constructor(private userRepository: IUserRepository){}

  async login(loginData: LoginDTO): Promise<string>{
    const user = await this.userRepository.getByEmail(loginData.email)
    
    if(!user || !user.password){
      throw new Error('User not found.')
    }

    const userPassword = user.password as string

    const isPasswordValid = await bcrypt.compare(loginData.password, userPassword)

    if(!isPasswordValid){
      throw new Error('Invalid credentials.')
    }

    const payload = {...user}
    const secretKey = process.env.JWT_SECRET_KEY as string
    const options = { expiresIn: '1d'}

    const token = jwt.sign(payload, secretKey, options)

    return token
  }
}