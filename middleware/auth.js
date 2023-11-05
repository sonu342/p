const jwt = require('jsonwebtoken')
const UserModel=require('../models/User')
const checkAuth = async(req,res,next)=>{
// console.log('hello middleware');
const {token} =req.cookies
// console.log(token)
if(!token){
     req.flash('error','Unauthorized user, Please Login!')
     return res.redirect('/')                      
}else{
   const verify_token= jwt.verify(token,'sonu123456789') 
//    console.log(verify_token)  
const data = await UserModel.findOne({_id:verify_token.ID});
// console.log(data)
req.data1= data;
next()                    
}
}

module.exports = checkAuth