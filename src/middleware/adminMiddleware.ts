import { Request, Response, NextFunction } from "express";
import { role } from "../users/utils/roles";

export function validateAdmin(req: Request, res: Response, next: NextFunction) {
    
    if (req.body.role !== role.ADMIN) {
        return res.status(401).json({ message: "Unauthorized, admin authentication required!" });
    }
    

    next();
}