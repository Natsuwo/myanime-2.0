module.exports = (server) => {
    const io = require('socket.io')(server);
    
    io.on('connection', (socket) => {
        socket.on("user", () => {
            // User.find({}).then(docs => {
            //     io.sockets.emit("data", docs)
            // })
        })


        // Anime.find({}).then(docs => {
        //     io.sockets.emit("client-anime", docs)
        // })


    });

} 