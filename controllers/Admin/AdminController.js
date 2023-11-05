const CouresModel = require('../../models/Course')
const nodemailer =require('nodemailer')

class AdminController{
      static GetAllData = async(req,res)=>{
        try{
           const{name,image,_id,email} =req.data1              
          const data = await CouresModel.find()
          res.render('admin/getAllData',{n:name,email:email,img:image,d:data})
        }
        catch(error){
          console.log(error)                 
        }                   

      } 
      static UpdateStatus = async (req, res) => {
        try {
          //  console.log(req.body);
          const { name,email,status,comment,course } =req.data1 
          await CouresModel.findByIdAndUpdate(req.params.id, {
            comment: comment,
            status: status
          })
          this.sendEmail(name,email,status,course)
          res.redirect('/admin/getAllData')
        }
        catch (error) {
          console.log(error);
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


module.exports=  AdminController