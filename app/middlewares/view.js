 
 
 

const view = ( ) => {
 
    return (req, res, next) => {
        res.view = async (page,  viewProps) => {
            

            const Home = require('../../resources/views/'+page).default;

            const { html } = Home.render(viewProps);

            return res.send(html)
             
  
        };

     
        next();
    };
};

export default view;