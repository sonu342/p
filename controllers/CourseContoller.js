const CouresModel = require('../models/Course')
const nodemailer =require('nodemailer')

class CourseContoller {
 static courseInsert= async(req,res)=>{
try {
//  console.log(req.body)
const {id} = req.data1;
const {name,email,phone,city,address,course} = req.body
const result = new CouresModel({
  name:name,
  email:email,
  phone:phone,
  city:city,
  address:address,
  course:course,
  userId : id

})
await result.save()
// calling sendemail()
this.sendEmail(name,email,course)

      res.redirect('/courseDisplay')

         } catch(error) {
          console.log(error)            
          }                
         }                           
 static courseDisplay = async(req,res)=>{
 try{
      const data =await CouresModel.find()
      const {name,image} =req.data1
//       console.log(data)
        res.render('courseDisplay',{d:data, n:name, img:image})
   } catch(err){
      console.log(err)                     
   }
 }  
 static courseView = async(req,res)=>{
  try{
    // console.log(req.params.id)
       const data =await CouresModel.findById(req.params.id)
       const {name,image} =req.data1
      //  console.log(data)
         res.render('courseView',{d:data, n:name, img:image})
    } catch(err){
       console.log(err)                     
    }
  }  
  static courseEdit = async(req,res)=>{
    try{
       console.log(req.params.id)
         const data =await CouresModel.findById(req.params.id)
         const {name,image} =req.data1
        //  //console.log(data)
           res.render('courseEdit',{d:data, n:name, img:image})
      } catch(err){
         console.log(err)                     
      }
    } 
    static courseUpdate= async(req,res)=>{
      try{
         console.log(req.params.id)
         console.log(req.body)
         const {name,email,phone,city,address,course} = req.body
   const data =await CouresModel.findByIdAndUpdate(req.params.id,{
      name:name,
  email:email,
  phone:phone,
  city:city,
  address:address,
  course:course
   })
   res.redirect('/courseDisplay')
          
        } catch(err){
           console.log(err)                     
        }
      } 
      static courseDelete= async(req,res)=>{
         try{
          await CouresModel.findByIdAndDelete(req.params.id)  
         res.redirect('/courseDisplay')
             
           } catch(err){
              console.log(err)                     
           }
         } 

         static sendEmail = async (name,email,course) => {
      //  console.log(name,email,course)
            //connenct with the smtp server
        
            let transporter = await nodemailer.createTransport({
              host: "smtp.gmail.com",
              port: 587,
        
              auth: {
                user: "sahu8824@gmail.com",
                pass: "jsaejwninbauqoax",
              },
    });
            let info = await transporter.sendMail({
              from: "test@gmail.com", // sender address
              to: email, // list of receivers
              subject: `Cousre Registration Succesfully Please wait`, // Subject line
              text: "heelo", // plain text body
              html: `<b>${name}</b> Registration is  <b>${course}</b> successful! `, // html body
            });
    };

}                                        
module.exports = CourseContoller