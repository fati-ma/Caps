'use strict'

const net = require('net');

const client = new net.Socket();
const host = process.env.HOST || 'localhost';
const port = process.env.PORT || 3000;

client.connect(port, host, () => {
    client.on('data', (data) => {
        const obj = JSON.parse(data);
        if (obj.event == 'pickup') {
            setTimeout(() => {
                console.log(`DRIVER: picked up ${obj.payload.orderID}`);
                let message=JSON.stringify({event:'in-transit',payload:obj.payload});
                client.write(message);
            }, 1000);
            setTimeout(() => {
                console.log(`DRIVER: delivered up ${obj.payload.orderID} `);
                let msg=JSON.stringify({event:'delivered',payload:obj.payload});
                client.write(msg);
            }, 3000)
        }
    });
    client.on('close', () => console.log("vendor connection CLosed"));
    client.on('error', (e) => console.log("vendor Error", e));

});