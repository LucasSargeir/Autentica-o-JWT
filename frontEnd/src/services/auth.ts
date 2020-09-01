import api from './api';

interface Response{
    token: string;
    user:{
        nome: string;
        email:string;
        id: number;
        sexo: string;
        data_nasc: string;
    };
}

interface Validacao{
    email:string;
    senha:string;
}
export async function signIn(props: Validacao){

    try{
        const resp =  await api.post('/auth/authenticate',{email: props.email, senha:props.senha})
        return resp.data;
    }
    catch(err){
        return{
            "token": "",
            "user": null
        }
    }
}