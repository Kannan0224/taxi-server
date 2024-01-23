import  {Schema, model,} from 'mongoose'

//creating an interface 
interface Complaint {
    username :string,
    usermail :string,
    mobileNumber :string ,
    subject :string, 
    message:string
}

//Postschema
const complaintSchema = new Schema<Complaint>({
    username : {type : String } , 
    usermail : {type : String },
    mobileNumber : {type : String } ,
    subject : {type : String }, 
    message : {type : String }
})

//creating a model
 export const Complaint = model<Complaint>('Complaint', complaintSchema )