require('dotenv').config()
const express=require('express')
const mongo0se =require('mongoose')
const bcrypt =require('bcrypt')
const jwt= require('jsonwebtoken')
const { default: mongoose } = require('mongoose')


const app= express()

//open Route = public route
app.get('/',(req,res)=>{
 res.status(200).json({msg:'bem vindo'})
})
//config json
app.use(express.json())

//Models
const User=require('./models/User')

  app.get('/user/:id', async(req,res)=>{
      const id = req.params.id
      const user = await User.findById(id,'-password')
      if(!user){
          return res.status(404).json({msg:"usuario não encontrado"})
      }
      res.status(200).json({user})
  })

  function checkToken(req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
  
    if (!token) return res.status(401).json({ msg: "Acesso negado!" });
  
    try {
      const secret = process.env.SECRET;
  
      jwt.verify(token, secret);
  
      next();
    } catch (err) {
      res.status(400).json({ msg: "O Token é inválido!" });
    }
  }



//register users
app.post('/auth/register', async(req,res)=>{
    const{name,email,password,confirmpassword}=req.body

    if(!name){
        return res.status(422).json({msg:"o nome é obricatón rio"})
    }
    if(!email){
        return res.status(422).json({msg:"o email é obricatón rio"})
    }
    if(!password){
        return res.status(422).json({msg:"o password é obricatón rio"})
    }
    if(password !== confirmpassword){
        res.status(422).json({msg:"a senha nao conferem"})
    }
    const userExists  =await User.findOne({email:email})
         
    if(userExists){
        return res.status(422).json({msg:"esse email ja esta logado "})
    }
    //create password
    const salt= await bcrypt.genSalt(12)
    const passwordHash = await bcrypt.hash(password,salt)

    const user=new User({
        name,
        email,
        password:passwordHash,
    })

    try{
    await user.save()
    res.status(201).json({msg:"usuario criado com sucesso"} )

    }catch(err){
        console.log(err)
      res.status(500).json({msg:"ocorreu um erro volte mais tarde"})
    }
}) 

app.post('/auth/login', async(req,res)=>{
    const {email,password}=req.body
         
    if(!email){
        return res.status(422).json({msg:"o email é obricatón rio"})
    }
    if(!password){
        return res.status(422).json({msg:"o password é obricatón rio"})
    }

     //checkar login
 const user  =await User.findOne({email:email})
         
 if(!user){
     return res.status(404).json({msg:"usuario não encontrado "})
 }

 //check if password exist
  const checkPassword=  await bcrypt.compare(password,user.password)
    
  if (!checkPassword){
    return res.status(422).json({msg:"password invalido"})
  }

     try{
         const secret = process.env.SECRET

         const token =jwt.sign({
             id:user._id,
         },secret,)
         res.status(200).json({msg:"autenticação feita com suceso", token})
     }
     catch (err){
       console.log(err)
     res.status(500).json({msg:"erro tente mais tarde"})
     }
})
 

//credenciais
const dbUser= process.env.DB_USER
const dbPassword= process.env.DB_PASS

mongoose.connect(`mongodb+srv://${dbUser}:${dbPassword}@cluster0.dksyfjn.mongodb.net/?retryWrites=true&w=majority`)
.then(()=>{
    app.listen(3001)
    console.log('conectou')
})
.catch((err)=> console.log(err))

