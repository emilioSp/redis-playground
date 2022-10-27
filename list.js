import { createClient } from 'redis';

const client = createClient();

client.on('error', err => console.error('Redis error', err));

await client.connect();

await client.del('words');

const words = ["ciao", "come", "stai?", "ti", "trovo", "bene", "grazie"];

await client.rPush('words', words);

let wordsInRedis = await client.lRange('words', 0, -1);

console.log(wordsInRedis);

const firstWord = await client.lPop('words');
wordsInRedis = await client.lRange('words', 0, -1);
console.log(firstWord);
console.log(wordsInRedis);

await client.disconnect();
