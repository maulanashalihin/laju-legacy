import Database from "../services/Database"

 

export default class UserController {
    
  public async index (request,response) { 
   
    const users = await Database.from("users")

    console.log(request.user)

    console.log(users)
    
    return response.inertia("hello",{title : "Ayam Goreng"})

  }

  public async create (request,response) {
  }

  public async store (request,response) {
  }

  public async show (request,response) {

    response.send(request.params.id)
  }

  public async edit (request,response) {
  }

  public async update (request,response) {
  }

  public async destroy (request,response) {
  }
}
  