const socket = io()

//variables being used in client
let movement;


movement = {
    up: false,
    down: false,
    left: false,
    right: false
}
document.addEventListener('keydown', function(event) {
    switch (event.keyCode) {
      case 65: // A
        movement.left = true;
        break;
      case 87: // W
        movement.up = true;
        break;
      case 68: // D
        movement.right = true;
        break;
      case 83: // S
        movement.down = true;
        break;
    }
});
document.addEventListener('keyup', function(event) {
    switch (event.keyCode) {
      case 65: // A
        movement.left = false;
        break;
      case 87: // W
        movement.up = false;
        break;
      case 68: // D
        movement.right = false;
        break;
      case 83: // S
        movement.down = false;
        break;
    }
});
//when getting a 'message' emit from server, print the data it sends (aka message it sends)
socket.on('message', (data) => {
    console.log(data)
    
})
//when a client joins it emits new players right away.
socket.emit('new player')
//every frame (60fps), emit movement, so server can keep track of what the new movement variable is (if moving left is true, if up is true etc.)
setInterval(() => {
    socket.emit('movement', movement)
}, 1000 / 60)

let canvas = document.getElementById('canvas')
canvas.width = 800;
canvas.height = 600;
let context = canvas.getContext('2d');
socket.on('state', (players) => {
    context.clearRect(0,0,800,600)
    context.fillStyle = 'green';
    for(let socket in players) {
        let player = players[socket];
        context.beginPath();
        context.arc(player.x, player.y, 10 , 0, 2*Math.PI);
        context.fill();
    }
})