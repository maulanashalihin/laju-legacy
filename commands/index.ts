 

import * as fs from 'fs';

(async ()=>{
     
    const natives = fs.readdirSync("./commands/native");
 
    
    for await (const file of natives) {
        
        
        const command = await import("./native/"+file);
            
        const args = process.argv.slice(2);

        if(args.length)
        { 
            if(command.default.commandName == args[0])
            {    
                command.default.args = args;

                command.default.run()
            }
           
        }

    }
})()
 