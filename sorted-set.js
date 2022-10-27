import { createClient } from 'redis';

const client = createClient();

client.on('error', err => console.error('Redis error', err));

await client.connect();

const family = [{
  name: 'Emilio',
  age: 38,
}, {
  name: 'Mami',
  age: 5
}, {
  name: 'Crina',
  age: 33
}, {
  name: 'Grazia',
  age: 4
}];

const multi = client.multi();

family.map(f => multi.zAdd('family', { score: f.age, value: JSON.stringify(f) }));

await multi.exec();

const orderedFamily = await client.zRange('family', 0, -1);
console.log(orderedFamily);

const revOrderedFamily = await client.zRange('family', 0, -1, { REV: true});
console.log(revOrderedFamily);

await client.disconnect();
