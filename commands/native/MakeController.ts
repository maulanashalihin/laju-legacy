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

         if (!filename.includes("Controller")) {
            filename += "Controller";
         }

         const path = "./app/controllers/" + filename + ".ts";

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
import { Response, Request } from "../../type"; 
import DB from "../services/DB";

class Controller {
    
  public async index (request : Request,response : Response) { 
  }

  public async create (request : Request, response : Response) {
  }

  public async store (request : Request, response : Response) {
  }

  public async show (request : Request, response : Response) {
  }

  public async edit (request : Request, response : Response) {
  }

  public async update (request : Request, response : Response) {
  }

  public async destroy (request : Request, response : Response) {
  }

}

export default new Controller()
  `;
   }
}

export default new Command();
