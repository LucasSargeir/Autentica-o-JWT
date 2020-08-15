import {Request, Response, NextFunction} from 'express';
import jwt from 'jsonwebtoken';

const authConfig = require('../config/auth.json');

const authMiddleware = (request: Request, response: Response, next: NextFunction) =>{

    const authHeader = request.headers.authorization;

    if(!authHeader){

        return response.status(401).send({error: "No token provided"});

    }

    const parts = authHeader.split(' ');

    if(!(parts.length === 2)){

        return response.status(401).send({error: "Token error"});
        
    }
    
    const [scheme, token] = parts;
    
    if(!/^Bearer$/i.test(scheme)){
        
        return response.status(401).send({error: "Token bad formated"});

    }

    jwt.verify(token, authConfig.secret, (err: any, decode: any) => {

        if(err){
            response.status(401).send({error: "Token invalid"});
        }

        request.headers.id_user = decode.id;
        return next();

    });

};

export default authMiddleware;