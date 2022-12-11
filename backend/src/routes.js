const express =require("express")
const routes = express.Router()

const AnnotetionController = require("./controllers/AnnotetionController")



//Rota annotetion
routes.get('/annotetions',AnnotetionController.Create)
module.exports=routes

