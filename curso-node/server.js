const express =require('express')


const app=express()
  
app.use(express.json())


app.get('/',(req,res)=>{
    res.status(402).json({msg:"rota principal funcionando"})
})

app.get("/login",(req,res)=>{
  res.sendFile(__dirname + "/html/index.html")
})

/*/app.get("/blog/:nome",(req,res)=>{
   // res.send("<h1>  </h1>")
      res.send("<h1>Ola "+ req.params.nome + "  </h1>")
})/*/


app.listen(3004)