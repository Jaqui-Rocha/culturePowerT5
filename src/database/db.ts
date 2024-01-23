import { connect, connection } from "mongoose" 
import { env } from "./env"



async function connectDb() {
  connection.on("error", (error) =>{
    console.error("Db not connected!")

  });
  try{
    await connect(env.DATABASE_URL)
    connection.on("open", () => {
      console.log("Db Connected successfully!")
    })
  } catch(error){
    console.error("Check db url!")
  } 
}

export { connectDb }
