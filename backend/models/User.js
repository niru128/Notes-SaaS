import mongoose from "mongoose";
import bcrypt from "bcryptjs"


const userSchema = mongoose.Schema({
    email : {
        type : String,
        required : true,
        unique : true,
    },
    password : {
        type : String,
        required : true
    },
    role : {
        type : String,
        required : true,
        enum : ['Admin', 'Member'],
        default : "Member"

    },
    tenant : {
        
       type : String,
        required : true
    }
})

userSchema.pre('save',async function(next){

    if(!this.isModified('password')) return next();

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(this.password,salt)
    next();

})

//compare password with entered one
userSchema.methods.matchPassword = async function(enteredPassword){
 return await bcrypt.compare(enteredPassword,this.password)
}

const User = mongoose.model("User",userSchema)
export default User;