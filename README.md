<center><h1>Autenticação de Usuário por JWT<br>(JSON web token)</h1></center>



Neste tópico vamos falar de autenticação de usuários por JSON web token (JWT). 

Esse método visa criar um token único a cada autenticação, armazenar esse token e a cada requisição, envia-lo ao servidor, este, por sua vez, valida a autenticidade do token, e então, envia a resposta.

Para isso precisamos entender quais os papéis de cada componente do nosso sistema, são eles:

 - **Back-end**

   ​	Responsável por gerar e validar os tokens

 - **Front-end**

   ​	Responsável por armazenar e enviar os tokens 

<hr>

## BACK-END


### Índice 

  - Encriptação de senha (bcrypt) <sub>extra</sub>
  - Criação do token
  - Validação do token



### Encriptação de sennha

A senha de um usuário é uma informação extremamente sigilosa, e não deve ser armazenado sem criptografia. Para encriptação de senhas em nodejs utilzaremos a biblioteca ***bcryptjs***. Instale-a utilizando o comando abaixo:

```bash
npm install bcryptjs
```

Caso esteja utilizando uma linguagem tipada não esqueça de instalar o pacote de tipos utilizando o comando:

```bash
npm install @types/bcryptjs
```



Ao encriptar uma senha, geramos um hash baseado na string passada. Podemos definir o número de saltos na hora de gerar o hash, isso basicamente é quantas vezes a encriptação vai ser feita dentro da mesma string. Veja no exemplo como encriptar uma senha de forma simples.

Exemplo:const routes const routes 

```typescript
import bcrypt from 'bcryptjs';

const senha = "minha_senha_123";
const saltos = 10; //número de encriptações
const hash = await bcrypt.hash(senha, 10);
```



Com o usuário já cadastrado, ele deve poder logar na aplicação. Para isso precisamos comparar a senha que ele deu com a senha salva no banco. Para isso, podemos utilizar o método _**compare**_ de dentro do bcrypt, como no exemplo.

Exemplo:

```typescript
// retorna um erro caso a senha não seja igual
if(! await bcrypt.compare(senha_inserida, senha_do_banco)){

	return response.status(400).json({error: "Senha inválida"});
	
}
```



Uma vez que o usuário foi autenticado não faz sentido que ele tenha que digitar a senha sempre que quiser logar na aplicação. Para resolver isso criarmos um token que será armazenado em um _local storage_ e passado a cada requisição ao servidor, a existência desse token significa que o usuário ainda está logado, logo não precisa se autenticar novamente.



### Criação do token

Para gerar tokens no nosso servidor vamos utilizar uma biblioteca chamada jsonwebtoken, a biblioteca padrão para tratar esse tipo de objetos em node. Para utilizar, primeiro devemos intalar através do comando abaixo:

```bash
npm install jsonwebtoken
```

Caso esteja utilizando uma linguagem tipada não esqueça de instalar o pacote de tipos utilizando o comando:

```bash
npm install @types/jsonwebtoken
```



Após a intalação precisamos preparar nosso ambiente para gerar as chaves. Para garantir que tokens gerados sejam únicos da nossa aplicação precisamos ter uma chave secreta que irá ser utilizada no momento de criação dos tokens. Para isso criamos um arquivo com o seguinte diretório `./config/auth.json` e nele deixamos a nossa chave criptografada (você pode gerar um sha1 ou md5 de algo relacionado a aplicação). 

Exemplo:

```json
{
    "secret": "7c222fb2927d828af22f592134e8932480637c0d"
}
```



Agora que temos nossa chave de encriptação, precisamos de mais uma informação para gerar o token, essa informação deve diferenciar cada usuário dos outros, usaremos o id como exemplo. O mais legal de utilizarmos o id para isso é que poderemos acessar ele em qualquer rota que precisarmos estar autenticados.

Na criação do token algumas informações são utiliazadas, como a nossa chave secreta, a informação que passamos do usuário e o timestamp do momento da autenticação. Com isso, garantimos que a cada vez que o usuario se logue, ele tenha um token diferente. Além disso podemos setar um período para que aquele token se torne inválido. 

Exemplo:

```typescript
import jwt from 'jsonwebtoken'

function generateToken(id_user: number){
    return jwt.sign({ id: id_user }, authConfig.secret,{
        expiresIn:  86400 //tempo passado em milisegundos
    })
}
```



### Validação do token

Para fazer a validação de uma requisição precisamos entender o conceito de middleware. Um middleware intercepta uma requisição antes de entrar na rota, com isso, podemos fazer as devidas verificações. Neste caso o middleware será responsável por validar a existência e veracidade de um token durante a requisição.

**CRIANDO O MIDDLEWARE**

Para criar o middleware vamos criar um arquivo com o seguinte diretório `./middlewars/auth.ts`. Diferente de uma rota comum, o middleware, além do `request` e `response`, recebe um parâmetro `next` que serve para indicar que nossa requisição pode seguir. Nele vamos começar da seguinte forma:

```typescript
import {Request, Response, NextFunction} from 'express';
import jwt from 'jsonwebtoken';

const authMiddleware = (request: Request, response: Response, next: NextFunction) =>{

    const authHeader = request.headers.authorization;
	
    return next();
    
};

export default authMiddleware;
```

Agora na constante authHeader temos o nosso token a ser validado e podemos fazer todas as verificações necessárias. Lembrando sempre que o `return next();` chamará a rota requisitada, logo deve ser chamado dentro de alguma condição.

Para verificar a validade de um token utilizamos um método de detro do pacote _jsonwebtoken_, mas antes disso, é importante saber que essa verificação demanda um certo processamento do servidor, então, antes de verificar se o token está correto podemos fazer outras verificações, afim de evitar processamento desnecessário. Um exemplo do que pode ser verificado é se objeto jwt foi passado de forma correta. Por padão um objeto jwt tem a seguinte estrutura:

```js
{
    "authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTk3MjY0OTgyLCJleHAiOjE1OTczNTEzODJ9.X0n9Q7OGAR215sWyt-02PHLTuvZZdRFFvxO_1BtEa_E"
}
```

Então podemos adicionar as seguintes verificações ao nosso middleware:

```typescript
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
```

Agora, podemos utilizar o método verify para validar o token passado na requisição. Esse método tem a seguinte assinatura `verify(token, key, f(err, decode))`, onde cada parâmetro representa:

	- `token `: token enviado na requisição (sem o "Bearer");
	- `key`: a chave secreta criada para gerar os tokens;
	- `f(err, decode)`: função chamada chamada depois da verificação (**err**: caso possua um erro | **decode**: informações passadas no momemnto de criação do token, no nosso caso o id);

Exemplo:

```typescript
const authConfig = require('../config/auth.json');

jwt.verify(token, authConfig.secret, (err: any, decode: any) => {

    if(err){
        response.status(401).send({error: "Token invalid"});
    }
    
	//para pegarmos o id na rota chamada precisamos passa-lo
    request.headers.id_user = decode.id;
    
    return next();

});
```



**UTILIZANDO O MIDDLEWARE**

Criado o middleware, basta agora utilizar ele em nossas rotas para que ao serem chamadas, passem pela verificação. Para utiliza-lo em uma rota vamos importar o mesmo no nosso arquivo de rotas, e coloca-lo como um parâmetro. Veja no exemplo abaixo:

```typescript
import express from 'express';
import AuthController from './controlles/AuthController';
import ProjectController from './controlles/ProjectController';
import authMiddleware from './middlewares/auth';

const authController = new AuthController();
const projectController = new ProjectController();

const routes = express.Router();

routes.post('/auth/register', authController.register );
routes.post('/auth/authenticate', authController.authenticate );
routes.get('/projects', authMiddleware ,projectController.show );


export default routes;
```



<hr>

## FRONT-END

