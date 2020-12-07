const socket = (app) => {
    let io = app.get('socketio');
    let api = app.get('api');
    io.on('connection' , (socket) => {
        console.log('Client connected', socket.id);
        socket.on('disconnect', () => console.log('Client disconnected'));
        socket.on('function', (data) =>{
            console.log(data);
            socket.emit('function', data);
        });
        socket.on('update', (data) => {
            socket.emit('updateResponse', api.updateData(data));
        })
    });

    setInterval(() => io.emit('time', new Date().toTimeString()), 1000);
};

module.exports = {set: socket};