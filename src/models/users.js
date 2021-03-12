const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const userSchema = new mongoose.Schema({
//     Title:{
// type:String,
// required:true,
// trim:true
//     },
    userName:{ 
        type: String,
        required:true,
        unique:true,
        trim:true,
        validate(value){
            if(!validator.isAlphanumeric(value,['en-US'])){
                throw new Error('not valid')
            }
        }
    },
    // lastName:{ 
    //     type: String,
    //     required:true,
    //     trim:true,
    //   unique:true
    //    validate(value){
    //     if(!validator.isAlphanumeric(value,['en-US'])){
    //         throw new Error('not valid')
    //     }
    // }
    // },
    
    // Email:{        
    //     type: String,
    //     required:true,
    //     trim:true,
       
    //     validate(value){
    //         if(!validator.isEmail(value)) throw new Error('invalid email')
    //     }
    // },
    phone:{
        type:String,
        required:true,
        trim:true
    },
    age:{
        type:Number
    },
    password:{
        type: String,
        required:true,
        trim:true,
        
    },
    // confirmPassword:{
    //     type: String,
    //     required:true,
    //     trim:true,
       
    // },
    userType:{
        type:Boolean,
        required:true
    },
    tokens:[{token:{
        type:String
    }}]
},
{timestamps:true}
)
userSchema.virtual('booking',{
    ref:'Booking',
    localField:'_id',
   foreignField:'users'
})

//  userSchema.methods.toJSON = function(){
//     const user = this
//     userObject = user.toObject()
//      delete userObject._id
//     delete userObject.tokens
//     delete userObject.password
//     return userObject
// }

userSchema.methods.generateToken = async function(){
    const user = this

    const token = jwt.sign({_id:user._id.toString()}, 'finalProject')
    user.tokens = user.tokens.concat({token})
    await user.save()
    return token
}

userSchema.statics.findByCredintials = async(userName, password)=>{
    const user = await User.findOne({userName})
    if(!user) throw new Error('not allowed')
    const isValidPass = await bcrypt.compare(password, user.password)
    if(!isValidPass) throw new Error('not allowed')
    return user
}

userSchema.pre('save',async function(next){
    const user = this
    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password, 8)
    }
    next()
})

const User = mongoose.model('User', userSchema)
module.exports = User