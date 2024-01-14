import * as express from 'express';
import { connection } from './config/db';
import { bookingRouter } from './router/bookinglist';
import * as cors from 'cors';

const app = express();

app.use(express.json());

app.use(cors())

const db = connection;

db.connect((err)=>{
    console.log(err)
});

app.use("/",(req,res)=>{
    res.send("../favicon.ico")
})

app.use("/booking",bookingRouter)

app.listen(process.env.PORT,()=>{
    console.log("connected successfully",process.env.PORT);
})
