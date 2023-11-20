import AuthController from "../app/controllers/AuthController"; 
import Auth from "../app/middlewares/auth"
import { view } from "../app/services/View";


import { Response } from "../type";

import { Request } from "hyper-express";
 
import  HyperExpress from 'hyper-express';

const Route = new HyperExpress.Router();


// guest routes

Route.get("/login",AuthController.loginPage);

Route.get("/google/redirect",AuthController.redirect);

Route.get("/google/callback",AuthController.googleCallback);
 

Route.post("/login",AuthController.processLogin);

Route.get("/register",AuthController.registerPage);

Route.post("/register",AuthController.processRegister);

Route.post("/logout",AuthController.logout)

// auth routes
Route.use("/auth",Auth)

Route.get("/auth/home",AuthController.homePage) 



Route.get("/auth/profile",AuthController.profilePage)

Route.post("/auth/change-profile",AuthController.changeProfile)

Route.post("/auth/change-password",AuthController.changePassword)
 

Route.get("/",async (req : Request,res : Response)=>{  


    return res.type("html").send(view("index.html"))
  
}) 



export default Route;