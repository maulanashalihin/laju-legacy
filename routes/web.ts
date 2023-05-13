import AuthController from "../app/controllers/AuthController";
import UserController from "../app/controllers/UserController";
import Auth from "../app/middlewares/auth"

const HyperExpress = require('hyper-express');

const Route = new HyperExpress.Router();


// user routes
const userController = new UserController();
const authController = new AuthController();
 


// guest routes

Route.get("/login",authController.store);


// auth routes
Route.use("/auth",Auth)

Route.get("/auth/user",userController.index) 



export default Route;