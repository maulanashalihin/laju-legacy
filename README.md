
# Hyperstack

Full stack boilerplate for your next project. Equipped with web technology with the best performance.


## Tech Stack

**Client:** Svelte, Inertia, TailwindCSS, Webpack Encore

**Server:** Node, Hyper Express (powered by uWebsockets.js), Typescript

**Database** : Knex.js, Redis

**Testing** : Cypress


## Installation

Clone this repo and install packages

```bash
  git clone https://github.com/maulanashalihin/hyperstack.git
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
### Benchmark Results
**Note!** these benchmarks should be **run over network for proper results** as running these benchmarks on localhost significantly strains the C++ to Javascript communications and class initializations performance due to near **no latency** in request times which is **unrealistic for real world scenarios**.

|                          | Version | Requests/s | Latency | Throughput/s |
| :--                      | --:     | :-:        | --:     | --:          |
| uWebsockets.js           | 20.8.0  | 196,544    | 464 ms  | 102 Mb/s     |
| HyperExpress             | 6.0.0   | 195,832    | 469 ms  | 101 Mb/s     |
| Fastify                  | 3.28.0  | 13,329     | 746 ms  | 8 Mb/s      |
| Express                  | 4.17.3  | 5,608      | 1821 ms | 3.7 Mb/s     |