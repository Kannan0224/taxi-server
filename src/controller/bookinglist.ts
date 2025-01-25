
// import { book, bookService } from "../../Model/bookingModel";
import { Booking } from "../schema/bookingSchema";
import { Complaint } from "../schema/complaintSchema";
import { Driver } from "../schema/driverSchema";

const formatDateTime = (date) => {
    const options = { hour: '2-digit', minute: '2-digit', hour12: true };
    const formattedTime = date.toLocaleTimeString('en-US', options);
    
    const day = String(date.getDate()).padStart(2, '0');
    const month = date.toLocaleString('en-US', { month: 'short' });
    const year = date.getFullYear();
    
    return `${day} ${month} ${year} : ${formattedTime}`;
  }

export const getAllBookingList = async (req,res) =>{
    console.log("get booking list");
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
    console.log("taxi booked");
    const book = await Booking.collection.insertOne(req.body).then(()=>{
            const formatDate = formatDateTime(new Date(req.body.userDate));
            const accountSid = process.env.TWILIOSID;
            const authToken = process.env.TWILIOAUTH;
            const client = require('twilio')(accountSid, authToken);
            client.messages.create({
                    body: `🚖 New Trip Booked , From: ${req.body.fromUser} ➡️  To: ${req.body.toUser} , 👤 UserName : ${req.body.userName} , 🕐 Date&Time: ${formatDate} , 📞 Phone  : ${req.body.userMobile}`,
                    from: '+13253356233',
                    to: process.env.PHONENUMBER
            }).then((response)=>{
                console.log(response);
                res.status(200).send({
                    message : "booking conformed",
                    status : 'success',
                    bookingId : response.insertedId
                });
            }).catch((err)=>{
                console.log("sns error",err);
                res.status(200).send({
                    message : "server Error",
                    status : 'failed',
                    bookingId : null
                 });
            })
        })
        .catch((err)=>{
            console.log("db error",err);
            res.status(200).send({
                message : "server Error",
                status : 'failed',
                bookingId : null
             });
        })
}

export const complaints = async(req,res)=>{
    const complaint = await Complaint.collection.insertOne(req.body).then((response)=>{
            res.status(200).send({
                message : "complaint registered",
                status : 'success',
                ComplaintId : response.insertedId
            });
        })
        .catch((err)=>{
            res.status(200).send({
                message : "server Error",
                status : 'failed',
                ComplaintId : null
             });
        })
}

export const driver = async(req,res)=>{
    const driver = await Driver.collection.insertOne(req.body).then((response)=>{
        res.status(200).send({
            message : "Driver registered",
            status : 'success',
            RegisteredId : response.insertedId
        });
    })
    .catch((err)=>{
        res.status(200).send({
            message : "server Error",
            status : 'failed',
            RegisteredId : null
         });
    })
}