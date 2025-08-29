const jsonServer = require('json-server');
const app = jsonServer.create();

app.post('/', ({ app: { parent: { db } } }, res) => { 

    db.setState({
      boards: [],
      cards: [],
      lists: [],
      users: [],
    }).write();

    // socket.emit('boardsState', []);

    return res.status(204).end();

})

export default app;