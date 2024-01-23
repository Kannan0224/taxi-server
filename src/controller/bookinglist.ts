
// import { book, bookService } from "../../Model/bookingModel";
import { Booking } from "../schema/bookingSchema";

export const getAllBookingList = async (req,res) =>{
    const book = await Booking.find({}).then((response)=>{
        res.send(response)
    }).catch((error)=>{
        console.log(error);
        res.status(200).send({
            message : "server Error",
            status : 'failed',
            bookingId : null
         });
    })
}




export const bookTaxi = async(req,res)=>{
    const book = await Booking.collection.insertOne(req.body).then((response)=>{
        const accountSid = process.env.TWILIOSID;
        const authToken = process.env.TWILIOAUTH;
        const client = require('twilio')(accountSid, authToken);
        client.messages.create({
            body: `Booking conformed cutomername ${req.body.userName} & customerMobileNumber *${req.body.userMobile}*`,
            from: '+12029333164',
            to: '+919894746047'
        }).then(() => {
            res.status(200).send({
                message : "booking conformed",
                status : 'success',
                bookingId : response.insertedId
            });
        })
        .catch((err)=>{
            res.status(200).send({
                message : "server Error",
                status : 'failed',
                bookingId : null
             });
        })
    });
}

// export const complaints = async(req,res)=>{
//     const data = req.body;
//     db.query(
//         'INSERT INTO complaints (username ,usermail ,mobileNumber  ,subject , message ) VALUES (? ,?, ?, ?, ?)', 
//         [data.userName , data.eMail, data.number, data.subject, data.message], 
//         (err, results, fields) => {
//             if (err) {
//                 res.status(200).send({
//                     message : "server Error",
//                     status : 'failed',
//                     bookingId : null
//                 });
//                 return;
//             }
            
//             console.log("Inserted successfully:", results);
//             res.status(200).send({
//                 message : "booking conformed",
//                 status : 'success',
//             });
//         }
//     );
// }

// export const driver = async(req,res)=>{
//     const data = req.body;
//     db.query(
//         'INSERT INTO driver (username ,mobileNumber ,location  ,vechileNumber , vechileType , message ) VALUES (? ,?, ?, ?, ?,?)', 
//         [data.userName , data.phoneNo, data.location, data.regNo, data.vechileType,data.message], 
//         (err, results, fields) => {
//             if (err) {
//                 res.status(200).send({
//                     message : "server Error",
//                     status : 'failed',
//                     bookingId : null
//                 });
//                 return;
//             }
            
//             console.log("Inserted successfully:", results);
//             res.status(200).send({
//                 message : "registerd successfully",
//                 status : 'success',
//             });
//         }
//     );
// }