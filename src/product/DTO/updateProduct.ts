interface UpdateProduct{
    name: string
    value: number
    amount: string
    description: string
    photo: string
    creatAt: Date
    updateAt: Date
 

}
export class UpdateProductDTO{
    name: string
    value: number
    amount: string
    description: string
    photo: string
    creatAt: Date
    updateAt: Date
   
    constructor(productData: UpdateProduct){
        this.name= productData.name
        this.value= productData.value
        this.amount= productData.amount
        this.description= productData.description
        this.photo= productData.photo
        this.creatAt= productData.creatAt
        this.updateAt= productData.updateAt
        
    }
}