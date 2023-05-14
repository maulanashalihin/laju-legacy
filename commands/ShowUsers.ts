
  import Database from "../app/services/Database";

  (async () => {
    
    const users = await Database.from("users").select("*");

    console.log(users);
    
    process.exit(1);
  })()
