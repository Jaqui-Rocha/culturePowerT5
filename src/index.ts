import dotenv from "dotenv"
import { connectDb } from "./database/db";
//import {env} from "./database/env"

import {app} from "./server"
dotenv.config()
connectDb() // verificar erro
app.listen(process.env.PORT, ()=> console.log("Db running!") )