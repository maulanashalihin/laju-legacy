 
import DB from "./DB";
import { generateUUID } from "./helper";
const bcrypt = require('bcrypt');
const saltRounds = 10;

class Autenticate {
    async hash(password) {
        return await bcrypt.hash(password, saltRounds);
    }
    async compare(password, hash) {
        return await bcrypt.compare(password, hash);
    }
    async process(user,request,response) {
 

        const token = generateUUID(); 
      
        await DB.table("sessions").insert({
            id : token,
            user_id : user.id,
            user_agent : request.headers["user-agent"]
        }); 
    
        response.cookie("auth_id",token,1000*60*60*24*30).redirect("/auth/whatsapp");
    }

    async logout(request,response){
        
        await DB.from("sessions").where("id",request.cookies.auth_id).delete();

        response.cookie("auth_id","",0).redirect("/login");
    }
}

export default new Autenticate();