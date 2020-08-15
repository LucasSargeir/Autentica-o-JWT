import {Request, Response} from 'express';
import Knex from '../database/connection';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'

const authConfig = require('../config/auth.json');

function generateToken(id_user: number){

    return jwt.sign({ id: id_user }, authConfig.secret,{
        expiresIn:  86400
    })

}

export default class AuthController{

    
    async register(request: Request, response: Response){

        const {
            nome,
            data_nasc,
            senha,
            sexo,
        } = request.body;

        try{

            const user = await Knex('usuario').select('*').where("nome", nome).first()

            if(user){

                return response.status(400).json({error: "Usuário já cadastrado"})

            }

            const hash = await bcrypt.hash(senha, 10)

            const insetedUser = await Knex('usuario').insert({
                nome,
                sexo,
                senha: hash,
                data_nasc,
            })


            return response.json({ "id": insetedUser[0], nome, sexo, data_nasc, token: generateToken(insetedUser[0])})
            
        }
        catch(err){

            return response.status(400).json({
                error: "Não foi possível realizar o cadastro", "log": err
            })

        }

    }

    async authenticate(request: Request, response: Response){

        const {nome, senha} = request.body;

        const user = await Knex('usuario').select('*').where("nome", nome).first()

        if(!user){

            return response.status(400).json({error: "Usuário inválido"});

        }

        if(! await bcrypt.compare(senha, user.senha)){

            return response.status(400).json({error: "Senha inválida"});

        }

        user.senha = undefined;

        const token = generateToken(user.id)

        response.send({user, token})

    }
}