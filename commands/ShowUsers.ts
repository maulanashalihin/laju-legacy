
  import Database from "../app/services/DB";

  (async () => {
    
    const users = await Database.from("users").select("*");

    console.log(users);
    
    process.exit(1);
  })()
