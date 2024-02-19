import { Product } from "../../product/model/productSchema";

interface UpdateUser {
    name: string,
    email:string,
    password: string,
    photo: string,
    role?: "ADMIN" | "USER",
    creatAt: Date,
    updateAt: Date,
    jewelsAmount: number,
    products: Array<Product>,
    favoriteProducts: Array<Product>
   
}

export class UpdateUserDTO{
    name: string
    email:string
    password: string
    photo: string
    role?: string
    creatAt: Date
    updateAt: Date
    jewelsAmount: number
    products: Array<Product>
    favoriteProducts: Array<Product>
    constructor(userData: UpdateUser){
        this.name= userData.name
        this.email= userData.email
        this.password= userData.password
        this.photo= userData.photo
        this.role= userData.role
        this.creatAt= userData.creatAt
        this.updateAt= userData.updateAt
        this.jewelsAmount= userData.jewelsAmount
        this.products= userData.products
        this.favoriteProducts= userData.favoriteProducts
    }

}