
import mongoose from 'mongoose'

let ObjectId = mongoose.Schema.Types.ObjectId
const organizationSchema = new mongoose.Schema({
    company_name:{
        type: String,
        unique: true
    },
})

const Organization = mongoose.model('organization', organizationSchema);

export default Organization