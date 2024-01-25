interface CreateProduct{
    name: string
    value: number
    amount: string
    description: string
    photo: string
    creatAt: Date
    updateAt: Date
    

}
export class CreateProductDTO{
    name: string
    value: number
    amount: string
    description: string
    photo: string
    creatAt: Date
    updateAt: Date
   
    constructor(productData: CreateProduct){
        this.name= productData.name
        this.value= productData.value
        this.amount= productData.amount
        this.description= productData.description
        this.photo= productData.photo
        this.creatAt= productData.creatAt
        this.updateAt= productData.updateAt
        
    }
}