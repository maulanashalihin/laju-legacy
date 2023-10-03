 
import DB
from "../services/DB";
import { Request, Response } from "../../type";

export default async (request : Request,response : Response) => {
     
   if(request.cookies.auth_id)
   { 
       const session = await DB.from("sessions").where("id",request.cookies.auth_id).first();

       if(session)
       {
           const user = await DB.from("users").where("id",session.user_id).select(["id","name","email","phone","is_admin","is_verified"]).first();
            
           
           request.user = user;

           request.share = {
               "user" : request.user,
           }
       }else{ 
           response.cookie("auth_id","",0).redirect("/login");
       }
      
   }
   else
   { 
       response.cookie("auth_id","",0).redirect("/login");
   }
}