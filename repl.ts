 
import Database from "./app/services/Database";

(async()=>{
  const users = await Database.from("users");
  console.log(users)
})()