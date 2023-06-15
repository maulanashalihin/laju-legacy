 
import Database from "./app/services/DB";

(async()=>{
  const users = await Database.from("users");
  console.log(users)
})()