# TrybeSmith

## About:

This project consists of medieval items stored in the API format structured in the MSC (Models, Services, Controllers) layer system and written using Typescript.

It is possible to perform basic operations that can be done in a database: Create (C) and Read (R). The database used for the creation of this project is MySQL.

#

## Technologies:

- NodeJS
- Express
- Typescript
- MSC Architecture (Model-Service-Controller)

#

## Methodologies:

- Kanban
- Scrum

#
## Routes:

### Login
- Make a Login with username and password (POST /login)

### Products
- List all products (GET /product)
- Register a new product (POST /product)
- Search an user by id (GET /product/:id)

### Users
- List all users (GET /users)
- Register a new user (POST /users)
- Search an category by id (GET /categories/:id)

### Orders
- List all orders (GET /orders)
- Register a new order (POST /orders)

## How to install the application:

To download the code:

```
git clone git@github.com:eduardomuchak/27-trybesmith.git
```

Enter the project root folder:

```
cd 27-trybesmith
```

#

## Running the aplication Locally VS Docker (recommended: Docker):

## Locally:

### Requirements:

- NodeJs Version: >=16.0.0

### Steps:

Rename the .env.example file to only .env and set the enviroment variables:

- MYSQL_HOST=db
- MYSQL_USER=root
- MYSQL_PASSWORD=password
- JWT_SECRET=secret

Install the dependencies:

```
  npm install
```

#

## Running with Docker:

### Requirements:

- Docker-Compose Version: >=1.29

### Steps:

Run node and db containers with this command:

```bash
  docker-compose up -d
```

Run the following code to attach a container:

```bash
  docker exec -it trybesmith bash
```

Rename the .env.example file to only .env and set the enviroment variables:

- MYSQL_HOST=db
- MYSQL_USER=root
- MYSQL_PASSWORD=password
- JWT_SECRET=secret

Install the dependencies (inside a container):

```
  npm install
```

To create the database:

- Open the MySQL Workbench, and paste the content of the file:

```bash
Trybesmith.sql
```

- The project database follows the structure below:

<p align="center">
  <img 
    src="./images/diagram-der.png"
  >
</p>

To run the aplication write the command:

```bash
npm start
```
