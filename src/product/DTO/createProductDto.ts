

interface CreateProduct{
    prodId: string
    name: string
    value: number
    jewelsAmount: number
    description: string
    photo: string
    creatAt: Date
    updateAt: Date
    

}
export class CreateProductDTO{
    prodId: string
    name: string
    value: number
    jewelsAmount: number
    description: string
    photo: string
    creatAt: Date
    updateAt: Date
   
    constructor(productData: CreateProduct){
        this.prodId= productData.prodId
        this.name= productData.name
        this.value= productData.value
        this.jewelsAmount= productData.jewelsAmount
        this.description= productData.description
        this.photo= productData.photo
        this.creatAt= productData.creatAt
        this.updateAt= productData.updateAt
        
    }
}