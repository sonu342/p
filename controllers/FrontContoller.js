const UserModel = require('../models/User')
const TeacherModel = require('../models/Teacher')
const bcrypt = require('bcrypt')
const jwt =require('jsonwebtoken')
const cloudinary = require('cloudinary').v2;
const CourseModel = require("../models/Course")
cloudinary.config({ 
    cloud_name: 'dsnmbg8qd', 
    api_key: '599927994578119', 
    api_secret: 'wpWF1OofmiAPowuSsCrYJMKDLdc' 
  });

class FrontController{
        static dashboard = async (req,res)=>{
 try {
    const {name,image,id} =req.data1
    const bca = await CourseModel.findOne({userId:id, course:'bca'})
    const mca = await CourseModel.findOne({userId:id, course:'mca'})
    const btech = await CourseModel.findOne({userId:id, course:'btech'})
    //  console.log(btech);
 res.render('dashboard',{n:name, img:image, b:btech, bca:bca, mca:mca})
} catch(error) {
  console.log(error)            
 }                
}  
static team = (req,res)=>{
 try {
    const {name,image} =req.data1
 res.render('About')
 } catch(error) {
  console.log(error)            
   }                
 }
 static about = async (req, res)=>{
    try{
        const {name,image, _id, email } = req.data1
        res.render('about',{n:name, img:image})

    }catch(error){
        console.log(error)
    }
   
}
 static contact= (req,res)=>{
  try {
    const {name,image} =req.data1
   res.render('Contact')
   } catch(error) {
    console.log(error)            
    }                
   }                   
   static login = (req, res) => {
    try {
        res.render('login',{msg: req.flash('error'), msg1: req.flash('success')})
   
    } catch (error) {
        console.log(error)
    }
}  
static registration = (req, res) => {
  try {
      res.render('registration', { msg: req.flash('error') })
  } catch (error) {
      console.log(error)
  }
}
      // Get User Sign in data
    static userInsert = async (req, res) => {
      try {
        const file = req.files.image;
        // UPLOAD FOLDER TO IMAGE CLOUDINARY
         const imageUpload = await cloudinary.uploader.upload(file.tempFilePath, {

          folder: 'profileImage'
        });
        // console.log(imageUpload);
   
          
          const { n, e, p, cp } = req.body
          const user = await UserModel.findOne({ email: e })
          // console.log(user)
          if (user) {
              req.flash('error', 'Email Already Exist')
              res.redirect('/registration')
          } else {
              if (n && e && p && cp) {
                  if (p && cp) {
                      const hashpassword = await bcrypt.hash(p, 10)
                      const result = new UserModel({
                          name: n,
                          email: e,
                          password: hashpassword,
                          image: {
                            public_id: imageUpload.public_id,
                            url:imageUpload.secure_url
                          }

                      })
                      await result.save()
                      req.flash('success', 'Registration Succesfully, Please Login')
                      res.redirect('/') // redirect to login page
                  } else {
                      req.flash('error', 'Password and Confirm Password does not match')
                      res.redirect('/registration')
                  }
              } else {
                  req.flash('error', 'All field are Required')
                  res.redirect('/registration')
              }
          }
      } catch (error) {
          console.log(error)
      }
  }
  // User login Method 
  static varifyLogin = async (req,res) =>{
    try{
        // console.log(req.body)
        const {email,password} = req.body
        if(email && password){
            const user = await UserModel.findOne({email:email})
            // console.log(user)
            if(user != null){
                const isMatched = await bcrypt.compare(password,user.password)
                // console.log(isMatched)
                if(isMatched){
                    if(user.role == 'admin'){
                        const token = jwt.sign({ ID: user.id }, 'sonu123456789');
                        res.cookie('token',token)
                res.redirect('/admin/getAllData')
                    } if(user.role == 'student'){
                        const token = jwt.sign({ ID: user.id }, 'sonu123456789');
                        // console.log(token)
                    res.cookie('token',token)
                    res.redirect('/dashboard')
                    }
                  
                } else{
                    req.flash('error', 'Email & Password does not Match, Try Agian')
                    res.redirect('/')
                }
            } else{
                req.flash('error', 'You are not Registered User, Please Register')
                res.redirect('/')
            }
        }else{
            req.flash('error', 'All field are Required')
            res.redirect('/')
        }
    } catch(err){
        console.log(err)
    }
} 
static logOut= (req,res)=>{
    try {
        res.clearCookie('token')
        res.redirect('/')
     } catch(error) {
      console.log(error)            
      } 
    }
      
    static Profile = async (req, res) => {
        try {
            const data = req.data1
            // console.log(data)
            const responseObject = {
                title: 'Profile',
                n: data.name,
                img: data.image,
                email: data.email,
                id: data._id,
                msg: req.flash('success'),
                msg2: req.flash('error')
            }
            res.render('profile', responseObject)
        } catch (error) {
            console.log(error)
        }
    }  
    static updateProfile = async (req, res) => {
        try {
            const { id } = req.data1
            const{name, email, phone , image}= req.body
            //console.log(req.files.image)
            if (req.files) {
                const user = await UserModel.findById(id)
                const imageID = user.image.public_id
                // console.log(imageID)

                //deleting image from Cloudinary
                await cloudinary.uploader.destroy(imageID)
                //new image update
                const imagefile = req.files.image
                const imageupload = await cloudinary.uploader.upload(imagefile.tempFilePath, {
                    folder: 'profileImage'
                })
                var data = {
                    n:name,
                    email:email,
                    phone:phone,
                    image: {
                        public_id: imageupload.public_id,
                        url: imageupload.secure_url
                    }
                 }
            }else{
                var data = {
                    n:name,
                    email:email,
                    
                 }   
            }
            await UserModel.findByIdAndUpdate(id,data)
            req.flash('success', "Update Profile successfully")
            res.redirect('/profile')
        } catch (error) {
            console.log(error)
        }
    }

    static changepassword = async (req, res) => {
        try {
            const body = req.body
            const currentUser = req.data1
            if (body.oldpassword == body.newpassword) {
                req.flash('error', 'Old password and new password should not be same.')
                res.redirect('/profile')
            } else {
                bcrypt.compare(body.oldpassword, currentUser.password, async (err, result) => {
                    if (err || !result) {
                        req.flash('error', 'Old password is incorrect')
                        res.redirect('/profile')
                    } else {
                        if (body.newpassword == body.cpassword) {
                            // Hash the new password
                            const hashPassword = await bcrypt.hash(body.newpassword, 10)
                            const updatedValues = {
                                password: hashPassword
                            }
                            const data = await UserModel.findByIdAndUpdate(currentUser.id, updatedValues)
                            // console.log(data)
                            req.flash('success', 'Password changed successfully')
                            res.redirect('/profile')
                         } 
                         else {
                            req.flash('error', 'New Password and Confirm New Password does not match')
                            res.redirect('/profile')
                        }
                    }
                })
            }
        } catch (error) {
            console.log(error)
        }
    }
  






                  
   
  

           

}
module.exports= FrontController