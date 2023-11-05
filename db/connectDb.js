const mongoose = require('mongoose');
const live_url = 'mongodb+srv://sahu8824:sonu123456@cluster0.si2nqkm.mongodb.net/admissionPortal?retryWrites=true&w=majority'
// const local_url ='mongodb://127.0.0.1:27017/admissionPortal'

// mongoose.connect('mongodb://127.0.0.1:27017/test');
const connectDb = () =>{
   return  mongoose.connect(live_url)
   .then(()=>{
console.log("Connected Succeessfully")
 })
 .catch((err)=>{
  console.log(err)
 })                  
}
module.exports = connectDb