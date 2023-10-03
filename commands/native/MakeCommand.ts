import * as fs from "fs";

class Command {
   /**
    * Command name is used to run the command
    */
   public args = [];

   public commandName = "make:command";

   public run() {
      if (this.args.length > 1) {
         let filename = this.args[1] as string;

         filename = filename.replace(/[^a-z0-9]/gi, "");

         const path = "./commands/" + filename + ".ts";

         if (fs.existsSync(path)) {
            //file exists

            console.log("File already exists");
            return;
         }

         fs.writeFileSync(path, this.getText());
      }
   }

   getText() {
      return `
  import DB from "../app/services/DB";

  (async () => {
    
    const users = await DB.from("users").select("*");

    console.log(users);
    
    process.exit(1);
  })()

`;
   }
}

export default new Command();
