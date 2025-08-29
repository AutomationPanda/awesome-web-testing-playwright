const jsonServer = require('json-server');
const app = jsonServer.create();
const moment = require('moment');
import { getUserId } from '../utils/getUserId'
import { validate } from '../utils/validate';

app.get('/', ({ app: { parent: { db } }, headers, query }, res) => {

  if (query?.starred === 'true') {
    query.starred = true
  }
  if (query?.starred === 'false') {
    query.starred = false
  }
  if (query?.id) {
    query.id = Number(query.id)
  }
  if (query?.name) {
    query.name = decodeURIComponent(query.name)
  }

  const publicBoards = db
    .get('boards')
    .filter({ user: 0, ...query })
    .value();
  const privateBoards = db
    .get('boards')
    .filter({ user: getUserId(headers), ...query })
    .value();

  const result = [...publicBoards, ...privateBoards];

  const response = res.status(200).jsonp(result);

  return response;

})

app.get('/:id', ({ app: { parent: { db } }, params, headers }, res, next) => {

  const boardId = parseInt(params.id)
  const board = db
    .get('boards')
    .find({ id: boardId })
    .value();

  const userId = getUserId(headers) || 0;

  if (board.user === userId || board.user === 0) {

    next()

  }
  else {
    res.status(403).jsonp({
      error: 'You don’t have access to this board'
    });
  }

})

app.post('/', ({ headers, body }, res, next) => {

  validate(['name'], body, res)
  if (res.statusCode !== 400) {

    body.user = getUserId(headers) || 0;
    body.starred = false;
    body.created = moment().format('YYYY-MM-DD');

    // socket.emit('boardCreated', req.body);

    next()

  }
})

app.delete('/', ({ app: { parent: { db } } }, res) => {

  db.set('boards', []).write();
  db.set('lists', []).write();
  db.set('cards', []).write();

  return res.status(204).end();

})

export default app;