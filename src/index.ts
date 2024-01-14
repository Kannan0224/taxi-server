import express = require('express');
import { connection } from './config/db';
import { bookingRouter } from './router/bookinglist';
import cors = require('cors');

const app = express();

app.use(express.json());

app.use(cors())

const db = connection;

db.connect((err)=>{
    console.log(err)
});



app.use("/booking",bookingRouter)

app.listen(process.env.PORT,()=>{
    console.log("connected successfully",process.env.PORT);
})
