import AuthController from "../app/controllers/AuthController";
import UserController from "../app/controllers/UserController";
import Auth from "../app/middlewares/auth"

const HyperExpress = require('hyper-express');

const Route = new HyperExpress.Router();


// user routes
const userController = new UserController();
const authController = new AuthController();
 


// guest routes

Route.get("/login",authController.loginPage);

Route.post("/login",authController.processLogin);

Route.get("/register",authController.registerPage);

Route.post("/register",authController.processRegister);

Route.post("/logout",authController.logout)

// auth routes
Route.use("/auth",Auth)

Route.get("/auth/user",userController.index)
    


 
 

Route.get("/",async (req,res)=>{  


    res.view("home.svelte",{ user : {name : "Maulana Shalihin"} })
  

})


 


Route.get("/hello",async (req,res)=>{  

    res.view("hello.svelte",{name : "Maulana Shalihin"})

})



export default Route;