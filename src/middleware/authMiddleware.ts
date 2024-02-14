import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken'

export class AuthMiddleware {
  static async handler(req: Request, res: Response, next: NextFunction){
    const { headers } = req

    if(!headers.authorization){
      throw new Error('Unauthorized.')
    }
    const token = headers?.authorization.replace("Bearer ", "")

    try {
      jwt.verify(token, process.env.JWT_SECRET_KEY as string)

    } catch (err) {
      return res.status(401).json({ message: "Invalid token" })
    }
    next()
 }
}