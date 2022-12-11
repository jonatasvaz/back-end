const express =require("express")
const app =express()
const routes= require("./routes")

require('./config/dbconfig')

app.use(express.json())
app.use(routes)

app.listen(3000, (req,res)=>{
    console.log('esta rodando na porta 3000')
})
