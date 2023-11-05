const monogoose = require('mongoose')

//user Schema
const TeacherSchema = new monogoose.Schema({
    name: {
        type: String,
        required: true                
    } ,
    email: {
type: String,
required: true                      
    } 
                      
},{timestamps:true})
const TeacherModel = monogoose.model('Teacher',TeacherSchema)


module.exports = TeacherModel

