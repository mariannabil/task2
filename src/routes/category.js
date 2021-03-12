const express = require('express')
const Category = require('../models/category')
const userAuth = require('../middleware/authUser')
const adminAuth = require('../middleware/authAdmin')
const router = new express.Router()

router.post('/cat/add',adminAuth,async(req,res)=>{
    try{
        const cat = new Category(req.body)
        await cat.save()
        res.send({
            status:1,
            data: {cat},
            message:"data inserted"
        })
    }
    catch(error){
        res.status(500).send({
            status:0,
            data:{error},
            message:"error inserting new category"
        })
    }
})

router.get('/cat/showAll', adminAuth, async(req,res)=>{
    try{
        categories = await Category.find({})
        res.status(200).send({
            status:1,
            data:{categories},
            message:"data retrived succussfuly"
        })

    }
    catch(error){
        res.send('error')
    }
})

router.delete('/cat/delete/:catId', adminAuth, async(req,res)=>{
    try{
    const catId = req.params.catId
    const cat= await Category.findOne({_id:catId})
    if(!cat) throw new Error('category not found')
    await cat.remove()
    res.send('removed')
    }
    catch(error){
        res.send(error)
    }
})

router.patch('/cat/edit/:catId', adminAuth, async(req,res)=>{
    const updates= Object.keys(req.body)
    const allowedUpdates = ['name']
    const isValid = updates.every((update)=>{allowedUpdates.includes(update)})
    if(!isValid) return res.send('error updating')
    try{
        const catId = req.params.catId
        const cat= await Category.findOne({_id:catId})
        updates.forEach((update)=>{
            cat[update] = req.body[update]
        })
        await cat.save()
        res.send('done')
    }
    catch(error){res.send(error)} 
})
module.exports=router