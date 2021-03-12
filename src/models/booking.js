const mongoose = require('mongoose')
const bookingSchema = new mongoose.Schema({
  destination:{
    type: mongoose.Schema.Types.ObjectId,
    required:true,
    trim:true, 
    ref:'User'  
  },
  name:{
    type:String,
    required:true,
    trim:true  
  },

  category:[
    {
        catId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'Category',
            required:true,
            trim:true
        }
    }
],

})
const Booking = mongoose.model('Booking', bookingSchema)
module.exports= Booking