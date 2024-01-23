
//import "dotenv/config";
import { connectDb } from "./database/db";
import {env} from "./database/env"
import {app} from "./server"

connectDb() // verificar erro
app.listen(env.PORT, ()=> console.log("Db running!") )
