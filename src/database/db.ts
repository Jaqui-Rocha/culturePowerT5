import { connect, connection } from "mongoose" 
import dotenv from "dotenv"
dotenv.config()

async function connectDb() {
  connection.on("error", (error) =>{
    console.error("Db not connected!",error)

  });
  try{
    await connect(process.env.DATABASE_URL as string)
    connection.on("open", () => {
      console.log("Db Connected successfully!")
    })
  } catch(error){
    console.error("Check db url!",error)
  } 
}

export { connectDb }
