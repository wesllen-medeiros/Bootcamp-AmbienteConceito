const express = require( 'express');

const server = express();

server.use(express.json()); //para que intenda json

//query params = ?teste=1
//route params = /users/1
//request body = { "nome": "wesllen"}

//CRUD: create read update delete


const users = ['wesllen', 'Robson','Eliane'];

server.use((req,res, next) =>{
  console.time('request');
  console.log(`Metodo: ${req.methods}; URL: ${req.url}`);//caso queira fazer manipulaçoes ma requisição
  next(); //sem bloquiar o resto das req
  console.timeEnd('request');

})//sera chamado independente da rota// global

function checkUserExists(req,res,next) {
  if(!req.body.name){
    return res.status(400).json({Error: 'user name is requires'});
    //vai no corpo e verifica se tem o nome se não encontrar retorna o erro 
    }
    return next();
}//middleware

function chackUserInArray(req,res,next){
  const user = users[req.params.index]
  if(!user){
    return res.status(400).json({Error: 'not locait'})
  }
req.user = user;// todas as rotas terão acesso

  return  next();
}


server.get('/users',chackUserInArray, (req , res) => {
  return res.json(req.user);  
})//listar todos

server.get('/users/:index',chackUserInArray, (req , res) => {
  const {index} = req.params;
  return res.json(req.user);  
})//listar somente id


server.post('/users',checkUserExists,(req,res) =>{
 const {name} = req.body;
 users.push(name);
 
 return res.json(users);
})//criar usuario


server.put('/users/:index',checkUserExists,chackUserInArray,(req,res) =>{
  const {index} = req.param;
  const {name} = req.body;

  users[index] = name;//sobrepor o nome que eu passei no vetor
  return res.json(users);
});//editar usuario

server.delete('/users/:index' ,chackUserInArray, (req,res) =>{
  const {index} = req.param;
  users.splice(index,1); //percorre no item ate o que a gente quer
  return res.send();
});//exclusão de usuario


server.listen(3000);