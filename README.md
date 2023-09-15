
# Laju

Ship your next project faster with Laju. Equipped with the best and the fastest web technology. make your days more enjoyable




## Tech Stack

**Client:** Svelte, Inertia, TailwindCSS, Esbuild

**Server:** Node, Hyper Express (powered by uWebsockets.js), Typescript

**Database** : Knex.js, Redis


## Get Started

Clone this repo and install packages

```bash
  git clone https://github.com/maulanashalihin/laju.git
  npm install
  cp .env.example .env
  npm run dev
```

 
## Documentation

You can study the stacks in the repository in the respective library documentation.

[1. Hyper Express](https://github.com/kartikk221/hyper-express/blob/master/docs/Examples.md)


[2. Svelte](https://learn.svelte.dev/tutorial/welcome-to-svelte)


[3. Inertia](https://inertiajs.com/)


[4. TailwindCSS](https://tailwindcss.com/)


[5. Knex.js](https://knexjs.org/)


[6. Redis](https://github.com/redis/node-redis)


[7. Cypress](https://www.cypress.io/)


###  Generator

you can create controller, command, migration files via command line. this will speed up your process in application development.

#### 1. Generate Controller
```bash
  node laju make:controller ControllerName
```

#### 2. Generate Command
```bash
  node laju make:command CommandName
```
command file will be generated in commands folder. you can execute the file with `ts-node commands/CommandFile.ts` or `node build/commands/CommandFile.js`


#### 2. Generate Migration
```bash
  npx knex migrate:make MigrationName
```
you can create migration files and seeder file with using native knex cli. you can learn it further here. https://knexjs.org/guide/migrations.html

    


### Folder Structure

    .
    ├── app                     # Main App (mostly touch files)
    │   ├── controllers         # controllerss
    │   ├── middlewares         # request interceptor
    │   └── services            # reusable services such as connecting to DB and Redis Service
    ├── benchmark               # Source files to compare this framework
    ├── build                   # compiled JS files
    ├── commands                # files to use as command line service
    ├── migrations              # create, alter and drop DB tables
    ├── public                  # static file of your apps
    ├── resources               # front end files
    │   ├── js                  # js folders
    │   └── views               # server side rending files
    ├── routes                  # route configuration
    ├── env.example
    ├── .gitignore
    ├── laju
    ├── clean
    ├── knexfile.ts
    ├── nodemon.json
    ├── package.json
    ├── postcss.config.js
    ├── sync_version
    ├── tailwind.config.js
    ├── esbuild.watch.js
    ├── esbuild.build.js
    └── tsconfig.json

 
    
### Inertia
create https://inertiajs.com/ with by passing the inertia file in Pages folder like this.

    public async loginPage (request,response) { 
 
        return response.inertia("auth/login")
    
    }

### Route to Controller
you can create server side rendering app using svelte. just include svelte files in views folder and pass the file in route or controller like this

    import UserController from "../app/controllers/UserController"; 

    Route.get("/user",UserController.index);
    
### Benchmark Results
**Note!** these benchmark test in Macbook Air M1. test script in benchmark folder.

|                          | Version | Requests/s | Latency | Throughput/s |
| :--                      | --:     | :-:        | --:     | --:          | 
| Laju                     | 6.5.9   | 193,834    |  2.04ms  | 17.38 Mb/s  |
| Native NodeJS            | 18.16.0  | 72,670    |  5.45ms  | 11.09 Mb/s  | 
