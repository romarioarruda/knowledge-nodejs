# knowledge-nodejs

Projeto para desafio a fim de consolidar/edificar minha experiência com Node.js.

Tecnologias usadas no projeto:

#### Backend:

* Node.js
* Express.js
* Knex.js
* Nodemon
* PM2
* Passport
* Mongoose
* Node-Schedule
* Consign
* Postgresql
* MongoDB

#### Frontend:

* Vue.js
* Bootstrap-vue
* Vue-router
* Vuex
* Axios
* Highlight.js


## Sobre o projeto

O sistema é uma plataforma para publicar artigos. O usuário se cadastra, faz o login e acessa os artigos já publicados e também publica novos artigos.

Os usuários podem ser cadastrados com níveis de acesso, como admin ou não. Por padrão, o usuário não é admin, requerendo que outro de nível admin lhe dê
esse privilégio.

# Rodando localmente

Garanta que o MongoDB e PostgreSql estejam instalados.

Na pasta backend, renomeie o arquivo `env_file` para `.env`.

Nesse caso, o usuário padrão do postgres é `postgres` e a senha por padrão é vazia. Se necessário, altere.

Em seguida, atualize as dependências do Node nas pastas backend e frontend:
`cd backend && npm i

cd frontend && npm i
`

Feito isso, execute o backend `npm start`, frontend `npm run serve`

e garanta que o mongoDB e PostgreSql estejam rodando também.

`sudo mongod ou sudo mongod --dbpath=data/db`

