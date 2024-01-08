import * as express from 'express';
import { connection } from './config/db';
import { bookingRouter } from './router/bookinglist';
import * as cors from 'cors';

const app = express();

app.use(express.json());

app.use(cors())

const db = connection;

db.connect();

app.use("/booking",bookingRouter)

app.listen(3001,()=>{
    console.log("connected successfully");
})