const events = require('./events');

events.on('pickup', (payload) => {
  setTimeout(function () {
    console.log(`DRIVER: picked up ${payload.orderId}`);
    events.emit('in-transit', payload);
  }, 1000);

  setTimeout(function () {
    console.log(`DRIVER: delivered up ${payload.orderId}`);
    events.emit('delivered', payload);
  }, 3000);
});


//another way
/*
events.on('pickup', (payload) => {
  setTimeout(Func1, 1000, payload);
  setTimeout(Func2, 3000, payload);
});

// helper function
function Func1(payload) {
  console.log(`DRIVER: picked up ${payload.orderId}`);
  events.emit('in-transit', payload);
}
function Func2(payload){
  console.log(`DRIVER: delivered up ${payload.orderId}`);
  events.emit('delivered', payload);
}  
*/