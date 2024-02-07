import dotenv from "dotenv"
import { connectDb } from "./database/db";

import {app} from "./server"
dotenv.config()
connectDb() 
app.listen(process.env.PORT, ()=> console.log("Db running!") )
