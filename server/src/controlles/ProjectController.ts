import {Request, Response} from 'express';


export default class ProjectController{

    async show(request: Request, response: Response){

        response.send({ok: true, user_id: request.headers.id_user})

    }

}