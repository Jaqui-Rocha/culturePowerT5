import { LoginDTO } from "../dto/loginDto";

export interface IAuthService {
  login(loginData: LoginDTO): Promise<string>
}