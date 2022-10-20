import { createClient } from 'redis';

const client = createClient();

client.on('error', err => console.error('Redis error', err));

await client.connect();

await client.set('foo', 'bar');
const value = await client.get('foo');
console.log('foo', value);

for (let i=0; i < 1000; i++) {
  await client.lPush('random-numbers', Math.random().toString());
}

const number = await client.rPop('random-numbers');
console.log(number);


const json = {
  test: [1,2,4,5],
  pippo: {
    pluto: true
  }
};

await client.set('json-example', JSON.stringify(json));

const jsonFromRedis = await client.get('json-example');
console.log((JSON.parse(jsonFromRedis)).test);

const family = await client.zRangeWithScores('family', 0, -1);

await client.disconnect();
