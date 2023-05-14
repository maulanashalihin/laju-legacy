import * as fs from 'fs';

class Command   {

  /**
   * Command name is used to run the command
   */
  public args = [];
  
  public   commandName = 'make:command'

  public   run () { 

    if(this.args.length > 1)
    {
      let filename = this.args[1] as string;

       filename = filename.replace(/[^a-z0-9]/gi, '');

       const command = filename.toLowerCase()
      
      
      fs.writeFileSync("./commands/"+filename+".ts",this.getText())
    }
    
   
    
 
  }


  getText()
{
  return `
  import Database from "../app/services/Database";

  (async () => {
    
    const users = await Database.from("users").select("*");

    console.log(users);
    
    process.exit(1);
  })()

`
}
}

export default new Command()
