# TODO LIST BACKEND
This application aims to model in a limited domain, a set of good practices of software development at the design and technological level.

## Technologies:
* Language: Typescript/NodeJs
* Web Framework/Libraries: Express
* API Docs: Swagger/SwaggerUI/SwaggerJSDoc
* Testing Library: Jest
* Code Style/Lint: ESLint/Prettier
* HOT DEV server: nodemon
* Env config: DotEnv
* DB Connector Library: mongodb
* DB: MongoDB

### Pending
* Infrastructure: Docker/DockerCompose
* Reverse Proxy: Nginx
* Security: Passport
* Process Manager: PM2
* More Tests

## Development
### Dependencies:
1) Docker & docker-compose
2) Node 14.x
3) PM2

### Run dev mode

`Prior to this you need to have a mongo running with the data that is in the develpment.env file or change said file with your mongo configuration.`
```
npm install
cp src/resources/config/env/development.env .env
npm run start:dev
```

## Production
Run the next command:

`Prior to this you need to have the .env file with all the information corresponding to your production environment.`

```
npm install
cp src/resources/config/env/development.env .env
npm start
```

## Other info

If you are running in development env, you can see useful data in the console such as the API docs and health-check endpoints.


