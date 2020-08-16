interface Response{
    token: string;
    user:{
        nome: string;
        email:string;
    };
}

export function signIn(): Promise<Response>{
    return new Promise(resolve =>{
        setTimeout(()=>{
            resolve({
                token: "skjansncknalkcndkj87y7dckxjclakddkjsbfkjsbfkjdsb",
                user:{
                    nome:"Lucas Sargeiro",
                    email:"sargeirolucas@gmail.com",
                }
            })
        }, 1000);
    })
}