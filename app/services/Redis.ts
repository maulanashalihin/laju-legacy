import { createClient,RedisClientType } from 'redis';

let client : RedisClientType;

(async()=>{
            
    client = createClient();

    client.on('error', (err: any) => console.log('Redis Client Error', err));

    await client.connect();



})()
// @ts-ignore:next-line
export default   client;