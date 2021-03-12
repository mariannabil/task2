const jwt = require('jsonwebtoken')
const User = require('../models/users')
const auth = async(req,res,next) =>{
    try{
        const token = req.header('Authorization').replace('Bearer ','')
        const decodedToken = jwt.verify( token , "finalProject" )
        const user = await User.findOne({_id:decodedToken._id, 'tokens.token': token})
        if(!user){ throw new Error() }
        req.user = user
        req.token = token
        next()
    }
    catch(eerror){
        res.send({
            data:{error},
            message:'please authintcate',
            status: 0
        })
    }
}
module.exports = auth