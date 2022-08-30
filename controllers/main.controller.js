'use strict'
const amqplib = require('amqplib');

const rabbitConnection = {
    protocol: 'amqp',
    hostname: 'localhost',
    port: 5672,
    username: 'guest',
    password: 'guest',
    vhost: '/',
    authMechanism: ['PLAIN', 'AMOPLAIN', 'EXTERNAL']
}

class mainController {

    async add (req,res,next) {
        const desc = 'messages'
        const connection =  await amqplib.connect(rabbitConnection)
        const channel = await connection.createChannel()
        await channel.assertQueue(desc)
        const message = JSON.stringify({name: 'kike', color: 'rede'})
        channel.sendToQueue(desc, Buffer.from(message, 'utf8'))
        res.send('message setted')
    }

   async read(req,res,next){
        const desc = 'messages'
        const connection =  await amqplib.connect(rabbitConnection)
        const channel = await connection.createChannel();
        await channel.assertQueue(desc);
        channel.consume(desc, (msg) => {
            if (msg !== null) {
              console.log('received:', msg.content.toString());
              channel.ack(msg);
            } 
          });
        res.send('messages readed')
    }

}

module.exports = new mainController();
