const mongoose = require("mongoose");
const validator=require("validator")

const customerSchema = new mongoose.Schema({

    fname: {
        type: String,
        required:true,
        trim:true
    },
    lname: {
        type:String,
        required:true,
        trim:true
    },
    email: {
        type:String,
        required:true,
        validate:{
            validator:validator.isEmail,
            message:`{VALUE} is not valid email`,
            isAsync:false
        },
        lowercase:true,
        unique:true,
        trim:true
    },
   
    phone: {
       type: String,
        required:true,
        unique:true,
        trim:true,
        validate: {
            validator: function (v) {
              return /\d{10}/.test(v);
            },
            message: (props) => `${props.value} is not valid phone number`,
          }
    },
    password: {
       type: String,
        required:true,
    
        // minLen 8,
        // maxLen 15
    }, // encrypted password
   
    createdAt: {
        type:Date,default:null
    },
    updatedAt: {
        type:Date,default:null
    }
}, {
    timestamps: true
})

module.exports = mongoose.model("Customer", customerSchema)