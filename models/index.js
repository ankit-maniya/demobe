import mongoose from 'mongoose'
import User from './user'
import Party from './party'
import Organization from './organization'

const URL = "mongodb://localhost:27017/crud";
const connectDb = () =>{
    return mongoose.connect(
        URL,{useNewUrlParser:true,useUnifiedTopology:true,useCreateIndex:true}
    );
}

const models = {
    User,
    Party,
    Organization
}

export {connectDb};
export default  models;