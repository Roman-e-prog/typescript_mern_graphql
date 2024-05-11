import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import {createHandler} from 'graphql-http/lib/use/express';
import uploadRouter from './routes/upload';
//fileupload
import schema from './schema/schema';
import dbConnect from './config/dbconnect';
import path from 'path';
dotenv.config();
const port = process.env.PORT || 8020;
const app = express();
dbConnect();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use('/graphql', createHandler({ schema }));
app.use('/api/upload', uploadRouter);
app.use(express.static(path.resolve(process.cwd(), 'frontend/public/')));
app.listen(port, ()=>{
    console.log(`App is listening on Port ${port}`)
})
