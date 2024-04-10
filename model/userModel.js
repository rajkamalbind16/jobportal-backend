import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import JWT from "jsonwebtoken";
//schema
 const userSchema = new mongoose.Schema({
    name:{
        type:String,required:[true,'Name is must']
    },


    email:{
        type:String,
        required:[true,'email is must'],
        unique:true,
        validate:validator.isEmail
    },
    password:{
        type:String,
        required:[true,'must'],
        validate:validator.isStrongPassword,
    },
    location:{
        type:String,
        default:'Kolkatta',
    }

 },
    { timestamps:true}
 )
// middleware
userSchema.pre('save',async function (){
    if(!this.isModified) return;
    const salt =await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password,salt);
});

//compare password

userSchema.methods.comparePassword =async function(userPassword){
    const isMatch =await bcrypt.compare(userPassword, this.password);
    return isMatch;
}

//josn web token
userSchema.methods.createJWT = function(){
    return JWT.sign({userId:this._id},
        process.env.JWT_SECRET,
        {expiresIn:'1d'}
        )
}
 export default mongoose.model('User',userSchema)