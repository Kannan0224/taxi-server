
// import { book, bookService } from "../../Model/bookingModel";
import { Booking } from "../schema/bookingSchema";
import { Complaint } from "../schema/complaintSchema";
import { Driver } from "../schema/driverSchema";

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
    console.log("booking taxi");
    const book = await Booking.collection.insertOne(req.body).then((response)=>{
        // const accountSid = process.env.TWILIOSID;
        // const authToken = process.env.TWILIOAUTH;
        // const client = require('twilio')(accountSid, authToken);
        // client.messages.create({
        //     body: `Booking conformed cutomername ${req.body.userName} & customerMobileNumber *${req.body.userMobile}*`,
        //     from: '+12029333164',
        //     to: '+919087777361'
        // }).then(() => {
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