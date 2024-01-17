import { connection } from "../config/db"

const db = connection;

export const getAllBookingList = async (req,res) =>{
    db.query("SELECT * from bookingList",(err,row,feilds)=>{
        if(row){
            const arrayOfObjects = row.map(row => {
                const object = {};
                for (const key in row) {
                  if (Object.prototype.hasOwnProperty.call(row, key)) {
                    object[key] = row[key];
                  }
                }
                return object;
              });
            res.send(arrayOfObjects)
        }
        if(err){
            res.sendStatus(500)
        }
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
            const accountSid = 'AC2a45c2fab654ccf3ba3907c1a266a877';
            const authToken = '6084a56e58eaccd1a897ed95d926858c';
            const client = require('twilio')(accountSid, authToken);
            client.messages.create({
                body: `Booking conformed cutomername ${data.userName} & customerMobileNumber *${data.userMobile}*`,
                from: '+12029333164',
                to: '+919087777361'
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