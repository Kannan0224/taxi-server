import * as express from 'express';
import { bookTaxi, complaints, driver, getAllBookingList } from '../controller/bookinglist';

export const bookingRouter = express.Router();


bookingRouter.get("/list",getAllBookingList);

bookingRouter.post("/insert",bookTaxi);

bookingRouter.post("/complaints",complaints);

bookingRouter.post("/joinUs",driver)


