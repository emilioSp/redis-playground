import { createClient } from 'redis';

const displayError = (err) => console.error('Redis error', err);

const publisher = createClient();
publisher.on('error', displayError);
await publisher.connect();

const subscriber = publisher.duplicate();
subscriber.on('error', displayError);
await subscriber.connect();

const subscriber2 = publisher.duplicate();
subscriber2.on('error', displayError);
await subscriber2.connect();

await subscriber.subscribe('messages', (message) => {
  console.log('SUB1', 'new message', message);
});

await subscriber2.subscribe('messages', (message) => {
  console.log('SUB2', 'new message', message);
});

publisher.publish('messages', JSON.stringify({ msg: 'hellloooooo' }));

setTimeout(() => {
  publisher.publish('messages', JSON.stringify({ msg: 'how are you?' }));
}, 1000);
