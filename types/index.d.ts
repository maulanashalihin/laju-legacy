import { Request, Response } from "hyper-express";

 

export interface Response extends Response {
    view(view : string,data? : any) : void,
    inertia(view : string,data? : any) : void,
}


export interface Request extends Request {
    user : any,
    share : any,
}
