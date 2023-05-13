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
      
      
      fs.writeFileSync("./src/commands/"+filename+".ts",this.getText(command))
    }
    
   
    
 
  }


  getText(filename : string)
{
  return `class Command{

    /**
     * Command name is used to run the command
     */
    public args = [];
    
    public   commandName = '${filename}'
  
    public   run () {  
   
    }
    
}

export default new Command()
`
}
}

export default new Command()
