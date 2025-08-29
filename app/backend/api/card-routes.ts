import { validate } from '../utils/validate';

const moment = require('moment');

const jsonServer = require('json-server');
const app = jsonServer.create();

app.post('/', ({ body }, res, next) => {

  validate(['boardId', 'listId', 'name'], body, res)

  if (res.statusCode !== 400) {
    // data generation
    body.created = moment().format('YYYY-MM-DD');
    body.deadline = moment()
      .add(3, 'days')
      .format('YYYY-MM-DD'),
      body.description = '';
    body.completed = false;

    // stream message
    //  socket.emit('cardCreated', body.listId, body);

    next()

  }
});

app.delete('/', ({ app: { parent: { db } } }, res) => {

  db.set('cards', []).write();

  return res.status(204).end();

})

export default app;
