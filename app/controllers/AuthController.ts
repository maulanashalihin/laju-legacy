 
import Redis from "../services/Redis";
import Database from "../services/DB"
import Authenticate from "../services/Authenticate";  
import  { redirectParamsURL } from "../services/GoogleAuth";
 import axios from "axios"
import { generateUUID } from "../services/helper";
import dayjs from "dayjs"

class AuthController {
    
  public async registerPage (request,response) { 
    return response.inertia("auth/register")
  }

  public async homePage (request,response) { 
    return response.inertia("home")
  }

  public async loginPage (request,response) { 


    return response.inertia("auth/login")
  }

  
 
  public async redirect (request,response) {

    const params = redirectParamsURL();

    const googleLoginUrl = `https://accounts.google.com/o/oauth2/v2/auth?${params}`;

    return response.redirect(googleLoginUrl);

  }

  public async googleCallback (request,response) {

      const {code} = request.query;
 

      const { data } = await axios({
        url: `https://oauth2.googleapis.com/token`,
        method: 'post',
        data: {
          client_id: process.env.GOOGLE_CLIENT_ID,
          client_secret: process.env.GOOGLE_CLIENT_SECRET,
          redirect_uri: process.env.GOOGLE_REDIRECT_URI,
          grant_type: 'authorization_code',
          code,
        },
      }); 

      const result = await axios({
        url: 'https://www.googleapis.com/oauth2/v2/userinfo',
        method: 'get',
        headers: {
          Authorization: `Bearer ${data.access_token}`,
        },
      });
      
      const {email,name,verified_email} = result.data;

      const check = await Database.from("users").where("email",email).first();

      if(check)
      {
        // 
        return Authenticate.process(check,response);
      }else{
        const user = {
          id : generateUUID(),
          email : email,
          password : await Authenticate.hash(generateUUID()),
          name : name,
          is_verified : verified_email,
          created_at : dayjs().format("YYYY-MM-DD HH:mm:ss"),
          updated_at : dayjs().format("YYYY-MM-DD HH:mm:ss")
        } 
        await Database.table("users").insert(user);

        return Authenticate.process(user,response);;
      }


      response.send("google callback")

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

