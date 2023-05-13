 
import Redis from "./Redis";
const bcrypt = require('bcrypt');
const saltRounds = 10;

class Autenticate {
    async hash(password) {
        return await bcrypt.hash(password, saltRounds);
    }
    async compare(password, hash) {
        return await bcrypt.compare(password, hash);
    }
    async process(user,response) {

        const session_hash = await bcrypt.hash(user.id.toString(), saltRounds);

        const token = user.id+":"+session_hash; 
      
        await Redis.set(token,JSON.stringify(user));
    
        response.cookie("auth_id",token).redirect("/auth/user");
    }
}

export default new Autenticate();