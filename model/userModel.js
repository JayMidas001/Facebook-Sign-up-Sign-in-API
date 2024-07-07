const mongoose = require(`mongoose`)

const mySchema = new mongoose.Schema({
    firstName:{type:String},
    surname:{type:String},
    contact:{type:String, unique:true},
    password:{type:String},
    dateOfBirth:{type:String},
    gender:{type:String},
    token:{type:String}
}, {timestamps:true})

const myModel = mongoose.model("User", mySchema)

module.exports = myModel