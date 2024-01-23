import express = require('express');
import * as dotenv from 'dotenv';
import cors = require('cors');

dotenv.config();

import { dbConnection } from './config/db';
import { bookingRouter } from './router/bookinglist';

const app = express();

app.use(express.json());

app.use(cors())

dbConnection.then(()=>console.log("db Connected successfully")).catch((err)=>console.log(err))

app.use("/booking",bookingRouter)

app.listen(process.env.PORT,()=>{
    console.log("connected successfully",process.env.PORT);
})
