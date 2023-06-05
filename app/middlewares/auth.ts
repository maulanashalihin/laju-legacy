import Redis from "../services/Redis";

export default async (request,response) => {
      
    if(request.cookies.auth_id)
    { 
        const user_string = await Redis.get(request.cookies.auth_id);

        if(user_string)
        {
            request.user = JSON.parse(user_string);

            request.share = {
                "user" : request.user
            }
        }else{
            response.status(401).send("Unauthorized");
        }
       
    }
    else
    {
        response.status(401).send("Unauthorized");
    }
}