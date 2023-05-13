import UserController from "../app/controllers/UserController";

const HyperExpress = require('hyper-express');

const Route = new HyperExpress.Router();


// user routes
const userController = new UserController();

Route.get("/user",userController.index)

Route.get("/user/:id",userController.show)

export default Route;