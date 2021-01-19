'use strict';

const io = require('socket.io-client');
const caps = io.connect('http://localhost:3000/caps');
require('dotenv').config();
let faker = require('faker');
let storeName = process.env.STORE_NAME;


caps.emit('join', storeName);

caps.on('joined', ()=>{

    console.log('Connected to VENDOR')
    
    setInterval(function () {
        let orderId = faker.random.uuid();
        let name = faker.name.findName();
        let adress = faker.address.city();
        let message= {
            store: storeName,
            orderID: orderId,
            coustomer: name,
            address: adress
        }
        
        caps.emit('pickup', message); 
    }, 5000);

    caps.on('delivered', (payload)=> {
        console.log(`Thank you for delivering ${payload.orderID}`)
    });

});
