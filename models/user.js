import mongoose from 'mongoose';
import bcrypt from 'bcrypt'
const seltRound = 5;
let ObjectId = mongoose.Schema.Types.ObjectId

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, { strict: true })

// require to use a function keyword instead of ES6 syntax function
userSchema.pre('save', async function(next) {
    const salt = await bcrypt.genSalt(seltRound);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

const User = mongoose.model('user', userSchema);

export default User;