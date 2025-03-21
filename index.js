import express from 'express' ;
import dotenv from 'dotenv' ;
import cors from 'cors';
import dbConnect from './utils/dbConnect.js';
import userRoute from './routes/user.route.js';
import bookRoute from './routes/book.route.js';
import {allBook, addBook, deleteBook} from './controller/book.controller.js'
import { createOrder } from './controller/order.controller.js';
import upload from './middlewares/multer.middleware.js'
import purchaseRoute from "./routes/purchase.route.js";


dotenv.config();
dbConnect();

const app = express() ;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get("/", (req, res)=>{
    res.status(200).json({message: "Hello from Server"});
})

app.use("/auth", userRoute);
app.get("/get-files", allBook);
app.post("/book", upload.single('file'), addBook);
app.post("/deleteBook", deleteBook);
app.post("/create-order", createOrder);
app.use("/book/", bookRoute);
app.use("/user/", userRoute);
app.use("/purchase",purchaseRoute);

export default app