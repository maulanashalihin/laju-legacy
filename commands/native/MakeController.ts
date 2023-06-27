import * as fs from 'fs';

class Command   {

  /**
   * Command name is used to run the command
   */
  public args = [];
  
  public   commandName = 'make:controller'

  public   run () { 

    if(this.args.length > 1)
    {
      let filename = this.args[1] as string;

      if(!filename.includes("Controller"))
      {  
          filename+="Controller"
      }
      
      
      fs.writeFileSync("./app/controllers/"+filename+".ts",this.getText())
    }
    
   
    
 
  }


  getText()
{
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
  `
}
}

export default new Command()
