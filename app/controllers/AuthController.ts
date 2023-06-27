 
import Redis from "../services/Redis";
import Database from "../services/DB"
import Authenticate from "../services/Authenticate"; 

class AuthController {
    
  public async registerPage (request,response) { 
    return response.inertia("auth/register")
  }

  public async homePage (request,response) { 
    return response.inertia("auth/register")
  }

  public async loginPage (request,response) { 
 
    return response.inertia("auth/login")
  }
 
  public async create (request,response) {
  }

  public async processLogin (request,response) {
     
    let body = await request.json(); 
    
    const {email,password} = body;

    const user = await Database.from("users").where("email",email).first();

    if(user)
    {
      const password_match = await Authenticate.compare(password,user.password);

      if(password_match)
      {
        return Authenticate.process(user,response);
      }
      else
      { 
        return response.cookie("error","Maaf, Password salah").redirect("/login")
      }
    }else{
      return response.cookie("error","Email tidak terdaftar").redirect("/login")
    }
    
  }

  public async processRegister (request,response) {
     
    
    let body = await request.json(); 
    const {email,password} = body;

    try {
        const id = await Database.table("users").insert({
          email : email,
          password : await Authenticate.hash(password)
        })
 

        const user = {
          id : id[0],
          email : email
        };
 

    return Authenticate.process(user,response);

   } catch (error) {
       

      return response.cookie("error","Maaf, Email sudah terdaftar").redirect("/register")
   }



 

    
  }

  

  public async show (request,response) {
    
  }

  public async edit (request,response) {
  }

  public async update (request,response) {
  }

  public async logout (request,response) {

    if(request.cookies.auth_id)
    {
      await Redis.del(request.cookies.auth_id);

      response.clearCookie("auth_id").redirect("/login")
    }
    

  }
}
  

export default new AuthController();