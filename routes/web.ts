import AuthController from "../app/controllers/AuthController"; 
import Auth from "../app/middlewares/auth"



const HyperExpress = require('hyper-express');

const Route = new HyperExpress.Router();
 
 


// guest routes

Route.get("/login",AuthController.loginPage);

Route.post("/login",AuthController.processLogin);

Route.get("/register",AuthController.registerPage);

Route.post("/register",AuthController.processRegister);

Route.post("/logout",AuthController.logout)

// auth routes
Route.use("/auth",Auth)

Route.get("/auth/home",AuthController.homePage) 
 

Route.get("/",async (req,res)=>{  


    res.view("home.svelte")
  

}) 



export default Route;