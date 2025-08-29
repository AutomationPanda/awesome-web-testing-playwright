const jsonServer = require('json-server');
const app = jsonServer.create();

app.delete('/', ({ app: { parent: { db } } }, res) => { 

  db.set('users', []).write();

  return res.status(204).end();

})

export default app;