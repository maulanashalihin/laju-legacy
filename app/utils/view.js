 

const shouldSeeOther = (req, res) => {
    const methods = ["PUT", "PATCH", "DELETE"];
    return res.statusCode === 303 && methods.includes(req.method);
};
 
 
import * as fs from "fs";

async function render({page,viewProps} ) {
     
   
    let result;
    if(process.env.CACHE_VIEWS)
    {
        global.cache_pages = global.cache_pages || {};

        if(global.cache_pages[page])
        {

            result = global.cache_pages[page];

        }else{
            
            result  = await fs.readFileSync(`./resources/views/${page}.html`, 'utf8');
            
            global.cache_pages[page] = result;
         
        }
    }else{

        result  = await fs.readFileSync(`./resources/views/${page}.html`, 'utf8');
    
    }
    
    
    for (const [key, value] of Object.entries(viewProps)) {
        result = result.replace(new RegExp(`{{${key}}}`, 'g'), value);
    } 
    return result;
    
}

const view = ( ) => {
 
    return (req, res, next) => {
        res.view = async (page,  viewProps) => {
           
          

            const html = await render( {page,viewProps});

            return res.send(html) 
  
        };

        const end = res.end;
        res.end = function () {
            if (shouldSeeOther(req, res)) {
                res.status(303);
            }
            return end.apply(this, arguments);
        };
        next();
    };
};

export default view;