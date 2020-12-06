socket = (io) => {
    io.on('connection' , (socket) => {
        console.log('Client connected', socket.id);
        socket.emit('welcome', 'Bienvenido')
        socket.on('disconnect', () => console.log('Client disconnected'))
        socket.on('function', (data) =>{
            console.log(data);
            socket.emit('function', data);
        });
    });

    setInterval(() => io.emit('time', new Date().toTimeString()), 1000);
};

module.exports = {set: socket};