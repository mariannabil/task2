const express = require('express')
const Booking = require('../models/booking')
 const userAuth = require('../middleware/authUser')
const adminAuth = require('../middleware/authAdmin')
const generalAuth = require('../middleware/authGeneral')
const router = new express.Router()

router.post('/booking/add', generalAuth, async(req,res)=>{
    try{
       // res.send(req.user)
        // userBooks =await Book.find({author:req.user._id})
        // console.log(userBooks.length)
        // if(userBooks.length%2==0) console.log('new')
        // else console.log('e3ada')
        const book = new Book({
            ...req.body,
            author: req.user._id
        })
      //  console.log(book)
        if(req.user.userType == true) booking.status=true
        else booking.status = false
        await booking.save()
        res.send(booking)
    }
    catch(e){
        res.send(e)
    }
})

router.post("/booking/confirm/:bookingId", adminAuth, async(req,res)=>{
    try{
        booking = await Booking.findOne({_id: req.params.bookingId})
        if(!booking) return res.send('not found')
        booking.status= true
        booking.save()
        res.send('confirmed')
    }
    catch(error) {res.send(error)}
})

router.get('/booking/:catId', generalAuth, async(req,res)=>{
    try{
       // console.log(req.params.catId)
        booking= await Booking.find({'category.catId':req.params.catId})
        res.send(booking)
    }
    catch(e){
        res.send(e)
    }
})

module.exports= router








