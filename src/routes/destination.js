const express = require('express')
const destination = require('../models/destination')
 const userAuth = require('../middleware/authUser')
const adminAuth = require('../middleware/authAdmin')
const generalAuth = require('../middleware/authGeneral')
const router = new express.Router()

router.post('/destination/add', generalAuth, async(req,res)=>{
    try{
       // res.send(req.user)
        // userBooks =await Book.find({author:req.user._id})
        // console.log(userBooks.length)
        // if(userBooks.length%2==0) console.log('new')
        // else console.log('e3ada')
        const destination = new destination({
            ...req.body,
            ticket: req.user._id
        })
      //  console.log(book)
        if(req.user.userType == true) destination.status=true
        else destination.status = false
        await destination.save()
        res.send(destination)
    }
    catch(e){
        res.send(e)
    }
})

router.post("/destination/confirm/:destinationId", adminAuth, async(req,res)=>{
    try{
        destination = await destination.findOne({_id: req.params.bookId})
        if(!destination) return res.send('not found')
        destination.status= true
        destination.save()
        res.send('confirmed')
    }
    catch(error) {res.send(error)}
})

router.get('/destination/:catId', generalAuth, async(req,res)=>{
    try{
       // console.log(req.params.catId)
        destination= await destination.find({'category.catId':req.params.catId})
        res.send(books)
    }
    catch(e){
        res.send(e)
    }
})

module.exports= router