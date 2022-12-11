const mongoose= require('mongoose')

const AnnotetionDataSchema= new mongoose.Schema({
    title:String,
    notes:String,
    priolity:Boolean,

})

module.exports= mongoose.model('Annotetions' , AnnotetionDataSchema)