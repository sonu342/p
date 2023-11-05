const mongoose = require('mongoose')

// user Schema 
const CourseSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        required: true,
    },

    phone: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    course: {
        type: String,
        required: true,
    },
    status: {
        type:String,
        default: 'Pending'
        
    },
    comment: {
        type:String,
       
        
    },
    userId: {
        type: String,
        required: true
    }


}, { timestamps: true })

const CouresModel = mongoose.model('course', CourseSchema)

module.exports = CouresModel