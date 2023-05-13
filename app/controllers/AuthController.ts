import {v4} from "uuid";
import Redis from "../services/Redis";

export default class AuthController {
    
  public async index (request,response) { 
  }

  public async create (request,response) {
  }

  public async store (request,response) {
    
    const token = "maulana"+":"+v4();

    await Redis.set(token,JSON.stringify({
      "name" : "Maulana Shalihin"
    }));

    response.cookie("auth_id",token).send("OK");
  }

  public async show (request,response) {
  }

  public async edit (request,response) {
  }

  public async update (request,response) {
  }

  public async destroy (request,response) {
  }
}
  