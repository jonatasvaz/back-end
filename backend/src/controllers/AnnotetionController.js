
const Annotetions=require('../models/annotetionData')

module.exports= {
    Create(request,response){
        const   { title,notes,priolity} = request.body;

        console.log(title)
        console.log(notes)
        console.log(priolity)
    }
}