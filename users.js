import { createClient } from 'redis';

const client = createClient();

client.on('error', err => console.error('Redis error', err));

await client.connect();

const users = [
  {
    id: 1,
    name: 'Emilio',
    surname: 'Spatola',
    age: 33
  },
  {
    id: 2,
    name: 'Crina',
    surname: 'Balaban',
    age: 30
  }
];

for (const u of users) {
  await client.multi()
  .set(`users:${u.id}`, JSON.stringify(u))
  .sAdd('users', u.id.toString())
  .exec();
}

await client.disconnect();
