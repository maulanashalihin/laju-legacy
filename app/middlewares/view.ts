 
 
 
import { Request, NextFunction } from 'express';

import { Response } from "../../type"


function view() : any {
 
    return (request : Request, response : Response, next : NextFunction ) => {

       

        response.view = async (page,  viewProps) => {
            

            const Home = require('../../resources/views/'+page).default;

            const { html } = Home.render(viewProps);

            return response.send(html)
             
  
        };
 

        next();
          
    };
};

export default view;