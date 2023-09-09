# API de Gerenciamento de Transações Financeiras
Este repositório contém testes unitários e de integração para uma API que gerencia transações financeiras de diferentes tipos. Foram utilizadas as ferramentas Mocha, Chai e Sinon para testar os comportamentos de alguns recursos da API.

## :hammer: Dependências
As seguintes dependências já estão incluídas no arquivo package.json:
- Express;
- Nodemon;
- Sequelize;
- Mysql2;
- Sequelize-cli;
- jsonwebtoken;
- Mocha;
- Chai;
- Sinon.

## :computer: Visualize este projeto:
- Instale as dependências: `npm install`
- Execute a aplicação para inicializar o container do banco de dados e da API: `docker-compose up -d`
- Abra terminal do container criado: `docker exec -it ex_transactions_api bash`
- Dentro do container, realize o build do projeto com `npm run build` e crie o banco de dados, as tabelas e insira os dados nas tabelas com `npm run db:reset`.

## :mag: Executando os testes:
Utilize o seguinte comando: `npm test:local`. Este comando irá executar os testes unitários e de integração definidos na suíte de testes, que verificarão se os comportamentos esperados estão sendo corretamente implementados na API.
Para verificar a cobertura dos testes, utilize: `npm run test:coverage`.

## :bulb: Habilidades:
A API possui as seguintes rotas:

- `POST /login`: Realiza o login do usuário e retorna um token JWT válido por 1 hora.
- `POST /transactions/:id`: Cria uma nova transaction a partir dos dados informados.
- `GET /transactions`: Retorna todas as transactions salvas no banco de dados.
- `GET /transactions/:id`: Retorna a transaction correspondente ao ID informado.

### Autenticação
As rotas `/transactions` exigem autenticação com JWT. Para acessá-las, é necessário enviar o token JWT no header Authorization da requisição. O token JWT pode ser obtido através da rota /login. 

### Criptografia de senhas
Para garantir a segurança das senhas dos usuários, foi utilizada a biblioteca `bcryptjs` para criptografá-las antes de armazená-las no banco de dados. Isso garante que mesmo em caso de vazamento de dados, as senhas dos usuários não estarão expostas.