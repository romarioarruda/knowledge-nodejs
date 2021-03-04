# knowledge-nodejs

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
* Cors
* JWT-Simple
* Bcrypt-Nodejs

#### Frontend:

* Vue.js
* Bootstrap-vue
* Vue-router
* Vue-toasted
* Vuex
* Axios
* Highlight.js
* Liquor-tree
* Font-awesome


## Sobre o projeto

O sistema é uma plataforma para publicar e consumir artigos. O usuário se cadastra, faz o login e acessa os artigos já publicados e também publica novos artigos.

Os usuários podem ser cadastrados com níveis de acesso, como admin ou não. Por padrão, o usuário não é admin, requerendo que outro de nível admin lhe dê
esse privilégio.

## Rodando a aplicação localmente

Garanta que o MongoDB e PostgreSql estejam instalados.

Na pasta backend, renomeie o arquivo `env_file` para `.env`.

Nesse caso, o usuário padrão do postgres é `postgres` e a senha por padrão é vazia. Se necessário, altere.

Em seguida, atualize as dependências do Node nas pastas backend e frontend:
`cd backend && npm i`

`cd frontend && npm i`

Feito isso, execute o backend `npm start`, frontend `npm run serve`

e garanta que o mongoDB e PostgreSql estejam rodando também.

A base de dados será migrada automaticamente ao executar o backend.

Pra rodar o mongo:
`sudo mongod ou sudo mongod --dbpath=data/db`

Acesse o frontend em:
`http://localhost:8080/`

O backend roda na porta `3000`

