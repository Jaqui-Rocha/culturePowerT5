import {  NextFunction,  Request, Response } from "express";

export function PrintReq(req: Request, res: Response, next: NextFunction){
    console.log("Method:", req.method)
    console.log("Url:", req.url)
    console.log("Body:", req.body)
    console.log("Query:", req.query)
    console.log("Params:", req.params)
    console.log("Headers:", req.headers)
    
    next()
}