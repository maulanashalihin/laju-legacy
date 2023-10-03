import * as fs from "fs";

class Command {
   /**
    * Command name is used to run the command
    */
   public args = [];

   public commandName = "make:controller";

   public run() {
      if (this.args.length > 1) {
         let filename = this.args[1] as string;

         const path = "./app/controllers/" + filename + ".ts";

         if (fs.existsSync(path)) {
            //file exists

            console.log("File already exists");
            return;
         }

         if (!filename.includes("Controller")) {
            filename += "Controller";
         }

         fs.writeFileSync(path, this.getText());
      }
   }

   getText() {
      return `class Controller {
    
  public async index (request,response) { 
  }

  public async create (request,response) {
  }

  public async store (request,response) {
  }

  public async show (request,response) {
  }

  public async edit (request,response) {
  }

  public async update (request,response) {
  }

  public async destroy (request,response) {
  }

}

export default new Controller()
  `;
   }
}

export default new Command();
