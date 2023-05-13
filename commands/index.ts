 

import * as fs from 'fs';

(async ()=>{
    
    // const files = fs.readdirSync("./commands");
    
    // for await (const file of files) {
        
        
    //     if(["index.ts","default"].includes(file) == false)
    //     {
    //         const command = await import("./"+file);
            
    //         const args = process.argv.slice(2);

    //         if(args.length)
    //         {
                
    //             if(command.default.commandName == args[0])
    //             {   
    //                 command.default.args = args;

    //                 command.default.run()
    //             }
               
    //         }
           
    //     }

    // }

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
 