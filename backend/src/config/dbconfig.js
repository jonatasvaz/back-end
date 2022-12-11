const mongoose= require('mongoose')

 const dbconfig=' mongodb+srv://usuario:usuario@cluster0.ksb7g.mongodb.net/annotetion?retryWrites=true&w=majority'

 const connection = mongoose.connect(dbconfig,{
     UseNewUrlParser:true,
     UseUnifiedTopology:true
 })

 module.exports=connection
