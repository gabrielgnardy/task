# API Gerenciamento de tarefas

Este projeto é uma API para gerenciamento de tarefas, construída com **Node.js**, **Express**, **Sequelize**, e utilizando **JWT** para autenticação. A API permite criar, atualizar, listar e deletar tarefas, além de contar com um sistema de autenticação de usuários e redefinição de senha. O **Swagger** é utilizado para documentar e testar a API de maneira interativa.

## Funcionalidades

- **Autenticação de Usuário**: Registro, login e autenticação de usuários com JWT.
- **Gerenciamento de Tarefas**: CRUD de tarefas com suporte a pesquisa e paginação.
- **Redefinição de Senha**: Sistema de envio de e-mails para redefinir a senha.
- **Documentação da API**: Usando Swagger para fornecer uma interface interativa para testar as rotas.
  
## Tecnologias Utilizadas

- **Node.js** e **Express**: Framework para construir a API.
- **Sequelize**: ORM para modelar e interagir com o banco de dados.
- **MySQL**: Banco de dados relacional utilizado.
- **JWT (JSON Web Token)**: Utilizado para autenticação segura.
- **Swagger**: Ferramenta de documentação interativa da API.
- **Nodemailer**: Utilizado para o envio de e-mails de redefinição de senha.

## Instalação

1. **Clone o repositório:**

   ```bash
   git clone https://github.com/gabrielgnardy/task

2. **Instale as dependências:**

    cd task
    npm install

3. **Configure as variáveis de ambiente no arquivo .env:**
    MYSQL_DB=***
    MYSQL_USER=***
    MYSQL_PASSWORD=***
    MYSQL_HOST=***
    JWT_SECRET=***
    FRONTEND_URL=http://localhost:3000
    EMAIL_USER="***"
    EMAIL_PASS="***"
    EMAIL_SERVICE="gmail"

4. **Rode as migrações para criar as tabelas no banco de dados:**

    npx sequelize-cli db:migrate

5. **Inicie o servidor**

    npm run dev

## Sequelize

O **Sequelize** é utilizado como ORM (Object-Relational Mapping) para interagir com o banco de dados MySQL. Ele facilita o mapeamento das tabelas para modelos JavaScript e simplifica as operações de banco de dados.

### Sincronização do Banco de Dados

O Sequelize sincroniza automaticamente os modelos definidos no código com o banco de dados. No arquivo principal (`server.js`), a sincronização ocorre com o seguinte código:

    ```javascript
    sequelize.sync()
    .then(() => console.log('Database synced'))
    .catch((err) => console.log('Error syncing database:', err));
    ```
## Endpoints Principais

### Autenticação

- **POST /api/auth/register**
  - Descrição: Registro de novos usuários.
  - Body (JSON):
    ```json
    {
      "email": "usuario@example.com",
      "password": "senha123",
      "name": "Nome",
      "surname": "Sobrenome"
    }
    ```
  - Retorno: Token JWT para autenticação.

- **POST /api/auth/login**
  - Descrição: Login de usuários e geração de token JWT.
  - Body (JSON):
    ```json
    {
      "email": "usuario@example.com",
      "password": "senha123"
    }
    ```
  - Retorno: Token JWT para autenticação.

### Gerenciamento de Tarefas

- **GET /api/tasks**
  - Descrição: Listagem de tarefas com suporte a paginação e pesquisa por descrição.
  - Query Params:
    - `page`: Página atual (opcional, default: 1).
    - `limit`: Quantidade de tarefas por página (opcional, default: 10).
    - `description`: Termo de busca nas descrições das tarefas (opcional).
  - Retorno: Lista de tarefas com a quantidade total de tarefas e total de páginas.

- **POST /api/tasks**
  - Descrição: Criação de uma nova tarefa.
  - Body (JSON):
    ```json
    {
      "title": "Título da tarefa",
      "description": "Descrição da tarefa",
      "completed": false
    }
    ```
  - Retorno: Objeto da tarefa criada.

- **PUT /api/tasks/:id**
  - Descrição: Atualização de uma tarefa existente.
  - Params:
    - `id`: ID da tarefa a ser atualizada.
  - Body (JSON):
    ```json
    {
      "title": "Novo título",
      "description": "Nova descrição",
      "completed": true
    }
    ```
  - Retorno: Tarefa atualizada.

- **DELETE /api/tasks/:id**
  - Descrição: Deleção de uma tarefa.
  - Params:
    - `id`: ID da tarefa a ser deletada.
  - Retorno: Mensagem de confirmação de deleção.

### Redefinição de Senha

- **POST /api/auth/reset-password**
  - Descrição: Envio de e-mail para redefinir a senha.
  - Body (JSON):
    ```json
    {
      "email": "usuario@example.com"
    }
    ```
  - Retorno: Mensagem de confirmação de envio do e-mail.

- **POST /api/auth/reset-password/confirm**
  - Descrição: Confirmação de redefinição de senha utilizando token JWT.
  - Body (JSON):
    ```json
    {
      "token": "token recebido por e-mail",
      "newPassword": "novaSenha123"
    }
    ```
  - Retorno: Mensagem de sucesso na redefinição de senha.


## Swagger

**Swagger** é utilizado para documentar e testar os endpoints da API de forma interativa. A documentação da API pode ser acessada através de uma interface gráfica gerada pelo Swagger.

### Configuração do Swagger

A configuração do Swagger é feita no arquivo principal da aplicação (`server.js`). A documentação da API é gerada a partir do arquivo `swagger-output.json` e é acessível na rota `/docs`.

### Acessando a Documentação

Após iniciar o servidor, você pode acessar a documentação interativa da API através da URL:

- **URL do Swagger**: `http://localhost:5000/docs`

Na interface do Swagger, você pode explorar todos os endpoints da API de forma interativa. Isso inclui a capacidade de visualizar as descrições dos endpoints, parâmetros esperados e respostas, além de executar requisições diretamente para testar a API.

### Mantendo a Documentação Atualizada

Para garantir que a documentação da API esteja sempre atualizada, siga estas práticas:

1. **Atualize o Arquivo `swagger-output.json`**:
   Sempre que fizer alterações nos endpoints da API, atualize o arquivo `swagger-output.json`. Isso pode ser feito regenerando o arquivo usando o comando:
    ```
    npm run swagger
    ```

## Instalação do MySQL

Para configurar o banco de dados MySQL para o seu projeto backend, siga os passos abaixo:

### 1. Baixar o MySQL

- **Windows e macOS**:
  1. Acesse a [página de download do MySQL](https://dev.mysql.com/downloads/installer/).
  2. Escolha o instalador adequado para o seu sistema operacional (Windows ou macOS) e faça o download.
  3. Execute o instalador e siga as instruções para instalar o MySQL Server.

- **Linux**:
  1. A instalação pode variar dependendo da distribuição. Para distribuições baseadas no Debian/Ubuntu, use o seguinte comando:
     ```bash
     sudo apt update
     sudo apt install mysql-server
     ```
  2. Para distribuições baseadas no Red Hat/CentOS, use:
     ```bash
     sudo yum install mysql-server
     ```

### 2. Configuração Inicial

Após a instalação, você precisará realizar algumas configurações básicas:

- **Iniciar o Serviço MySQL**:
  - No Windows, o serviço deve iniciar automaticamente. Caso contrário, você pode iniciar o serviço manualmente através do painel de serviços.
  - No macOS e Linux, você pode iniciar o serviço com o seguinte comando:
    ```bash
    sudo service mysql start
    ```

- **Configurar a Senha do Root**:
  - Após a instalação, é importante definir uma senha para o usuário `root`. Você pode fazer isso executando o seguinte comando e seguindo as instruções:
    ```bash
    sudo mysql_secure_installation
    ```

### 3. Criar o Banco de Dados

1. **Acessar o MySQL**:
   Abra o terminal ou prompt de comando e acesse o MySQL com o seguinte comando:
   ```bash
   mysql -u root -p
   ```

2. **Criar o Banco de Dados**:
   Após acessar o MySQL, você estará no prompt do MySQL. Para criar um banco de dados para o seu projeto, execute o seguinte comando:
   ```bash
   CREATE DATABASE JackExperts;
   ```
   
### 4. Testar a Conexão

Para garantir que a aplicação backend consegue se conectar corretamente ao banco de dados MySQL, siga estes passos:

1. **Iniciar o Servidor Backend**:
    No terminal, inicie o servidor backend com o comando:
    ```bash
    npm start
    ```
2. **Verificar Logs**:
    Após iniciar o servidor, observe os logs no terminal. Procure por mensagens que confirmem que a aplicação está se conectando ao banco de dados MySQL corretamente. Mensagens típicas de sucesso incluem confirmações de que a conexão foi estabelecida e que o servidor está escutando na porta especificada.


3. **Checar Criação de Tabelas**:
    Se a configuração estiver correta, o Sequelize deve criar automaticamente as tabelas necessárias no banco de dados. Para verificar, acesse o MySQL e liste as tabelas do banco de dados com seguinte comando:

    ```bash
    SHOW TABLES;

    ```

4. **Testar Endpoints da API**:
    Utilize ferramentas como Postman ou Insomnia para testar os endpoints da API que interagem com o banco de dados. Verifique se as operações de CRUD (criação, leitura, atualização e exclusão) estão funcionando como esperado e se os dados estão sendo corretamente manipulados no banco de dados.


5. **Depuração**:
   Se você encontrar problemas, verifique as seguintes áreas:

   - **Configuração do Sequelize**:
     Verifique se as credenciais do banco de dados e o nome do banco estão corretos no arquivo de configuração do Sequelize (`.env`). A configuração deve corresponder às informações do banco de dados MySQL que você criou, incluindo o nome de usuário, senha, nome do banco de dados e o host. Certifique-se de que a configuração está correta para o ambiente em que você está executando o servidor (desenvolvimento, teste, produção).

   - **Mensagens de Erro**:
     Analise as mensagens de erro exibidas no terminal e nas ferramentas de teste para identificar e corrigir problemas específicos. As mensagens de erro podem fornecer pistas valiosas sobre o que está dando errado, como problemas de conexão, erros de sintaxe SQL ou problemas com o modelo de dados.

Seguindo esses passos, você poderá verificar se a conexão com o MySQL está funcionando corretamente e se a aplicação backend está interagindo adequadamente com o banco de dados.
