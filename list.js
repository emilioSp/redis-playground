import { createClient } from 'redis';

const client = createClient();

client.on('error', err => console.error('Redis error', err));

await client.connect();

await client.del('words');

const words = ["ciao", "come", "stai?", "ti", "trovo", "bene", "grazie"];

const multi = client.multi();

for (const w of words) {
  multi.rPush('words', w);
} 

await multi.exec();

const wordsInRedis = await client.lRange('words', 0, -1);

console.log(wordsInRedis);

await client.disconnect();
