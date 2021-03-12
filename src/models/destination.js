const mongoose = require('mongoose')
const destinationSchema = new mongoose.Schema({
    ticket:{

 type: mongoose.Schema.Types.ObjectId,
    required:true,
    trim:true, 
    ref:'booking'
    },
    name:{
        type:String,
        required:true,
        trim:true
    },
})

const destination = mongoose.model('destination', destinationSchema)
module.exports= destination
