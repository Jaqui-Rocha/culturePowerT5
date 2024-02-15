import express from "express"
import { userRoutes } from "./users/routes/user.routes"
import { productRoutes } from "./product/routes/product.routes"
import { userRouterLogin } from "./auth/routes/authLogin.routes"
const app = express()
app.use(express.json())

app.use(userRoutes)
app.use(productRoutes)
app.use(userRouterLogin)


export {app}