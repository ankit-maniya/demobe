import express from 'express'
import {connectDb} from './models'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import {requireAuth} from './middleware/middleware';
import cors from 'cors'


const app = express();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cookieParser())
// app.use(cors())

app.use(function(req, res, next) {  
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Credentials",true);
    next();
});  

connectDb().then(async() =>{
    console.log("connected to mongodb");
});

app.use('/',requireAuth,require('./resolvers'))

const PORT = process.env.PORT || 7000;
app.listen(PORT,()=>{
    console.log(`Server Start At http://localhost:${PORT}`);
    
})