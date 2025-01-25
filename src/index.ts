import express = require('express');
import * as dotenv from 'dotenv';
import cors = require('cors');

dotenv.config();

import { dbConnection } from './config/db';
import { bookingRouter } from './router/bookinglist';

const app = express();

app.use(express.json());

app.use(cors());

app.use("/booking",bookingRouter)

dbConnection.then(()=>{
    console.log("db Connected successfully");
    app.listen(process.env.PORT,()=>{
        console.log("server running successfully",process.env.PORT);
    })

}).catch((err)=>console.log(err));




