import  {Schema, model,} from 'mongoose'

//creating an interface 
interface Booking {
    cartype:string, 
    package:string, 
    username:string, 
    bookFrom:string, 
    bookTo:string, 
    mobileNumber:string, 
    bookingdate:string
}

//Postschema
const BookingSchema = new Schema<Booking>({
    cartype:{ type : String } , 
    package: { type : String } , 
    username: { type : String } , 
    bookFrom: { type : String } , 
    bookTo: { type : String } , 
    mobileNumber: { type : String } , 
    bookingdate: { type : String } 
})

//creating a model
 export const Booking = model<Booking>('Booking', BookingSchema )