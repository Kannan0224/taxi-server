import { connection } from "../config/db"

const db = connection;

export const getAllBookingList = async (req,res) =>{
    db.query("SELECT * from bookingList",(err,row,feilds)=>{
        res.send(row)
    })
}

export const bookTaxi = async(req,res)=>{
    const data = req.body;
    db.query(
        'INSERT INTO bookingList (cartype, package, username, bookFrom, bookTo, mobileNumber, bookingdate) VALUES (? ,?, ?, ?, ?, ?, ?)', 
        [data.carType , data.userPackage, data.userName, data.fromUser, data.toUser, data.userMobile, data.userDate], 
        (err, results, fields) => {
            if (err) {
                res.status(200).send({
                    message : "server Error",
                    status : 'failed',
                    bookingId : null
                });
                return;
            }
            const accountSid = 'ACba0f2e9de532e1b62a74e53c8d5fffa7';
            const authToken = '528e35a944c7f8f4fcda28cd7a9c241a';
            const client = require('twilio')(accountSid, authToken);
            client.messages.create({
                body: `Booking conformed cutomername ${data.userName} & customerMobileNumber *${data.userMobile}*`,
                from: '+12019879395',
                to: '+919087477027'
            }).then(() => {
                res.status(200).send({
                    message : "booking conformed",
                    status : 'success',
                    bookingId : results.insertId
                });
            })
        }
    );
}

export const complaints = async(req,res)=>{
    const data = req.body;
    db.query(
        'INSERT INTO complaints (username ,usermail ,mobileNumber  ,subject , message ) VALUES (? ,?, ?, ?, ?)', 
        [data.userName , data.eMail, data.number, data.subject, data.message], 
        (err, results, fields) => {
            if (err) {
                res.status(200).send({
                    message : "server Error",
                    status : 'failed',
                    bookingId : null
                });
                return;
            }
            
            console.log("Inserted successfully:", results);
            res.status(200).send({
                message : "booking conformed",
                status : 'success',
            });
        }
    );
}

export const driver = async(req,res)=>{
    const data = req.body;
    db.query(
        'INSERT INTO driver (username ,mobileNumber ,location  ,vechileNumber , vechileType , message ) VALUES (? ,?, ?, ?, ?,?)', 
        [data.userName , data.phoneNo, data.location, data.regNo, data.vechileType,data.message], 
        (err, results, fields) => {
            if (err) {
                res.status(200).send({
                    message : "server Error",
                    status : 'failed',
                    bookingId : null
                });
                return;
            }
            
            console.log("Inserted successfully:", results);
            res.status(200).send({
                message : "registerd successfully",
                status : 'success',
            });
        }
    );
}