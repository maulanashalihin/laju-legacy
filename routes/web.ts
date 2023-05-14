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


import { renderToString } from 'react-dom/server';
import App from "../resources/jsx/App"
import React from "react";

Route.get("/",(req,res)=>{
    var props = { user: {name: "Santai"}};
    const html = renderToString(React.createElement(App, props));
 
    const result =  `<!DOCTYPE html>
    <html lang="en-gb">
    
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0"> 
    </head>
    <body>
    
        <div id="root"  >${html}</div>
 
    
    
    </body>
    </html>`
 

    res.send(result)
})



export default Route;