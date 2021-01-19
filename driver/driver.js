'use strict';

const io = require('socket.io-client');
const caps = io.connect('http://localhost:3000/caps');
require('dotenv').config();

let storeName = process.env.STORE_NAME;

caps.emit('join', storeName);

caps.on('joined', () => {

    console.log('Connected to DRIVER')

    caps.on('pickup', payload => {

        setTimeout(() => {
            console.log(`DRIVER: pickedup ${payload.orderID}`);
            caps.emit('in-transit', payload); 
        }, 1500);

        setTimeout(() => {
            console.log(`DRIVER: delivered up ${payload.orderID} `);
            caps.emit('delivered', payload); 

        }, 3000)
    })

});
