import  {Schema, model,} from 'mongoose'

//creating an interface 
interface Driver {
    username : string,
    mobileNumber: string ,
    location : string ,
    vechileNumber : string, 
    vechileType: string , 
    message : string
}

//Postschema
const driverSchema = new Schema<Driver>({
    username : { type : String } ,
    mobileNumber: { type : String } ,
    location : { type : String } ,
    vechileNumber : { type : String }, 
    vechileType: { type : String } , 
    message : { type : String }
})

//creating a model
 export const Driver = model<Driver>('Driver', driverSchema )