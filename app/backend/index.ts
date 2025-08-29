import { PluginOption } from 'vite';
import boardRoutes from './api/board-routes';
import cardRoutes from './api/card-routes';
import listRoutes from './api/list-routes';
import resetRoutes from './api/reset-routes';
import userRoutes from './api/user-routes';
import loginRoutes from './api/login-routes';
import signupRoutes from './api/signup-routes';
import locationRoutes from './api/location-routes';
import constants from '../constants';
const { SERVER } = constants

export const startServer = (): PluginOption => {

  const jsonServer = require('json-server');
  const app = jsonServer.create();
  const auth = require('json-server-auth');
  const nocache = require('nocache')
  const busboy = require('connect-busboy');
  const history = require('connect-history-api-fallback');
  const middleware = require('./middleware');

  const router = jsonServer.router('./backend/data/database.json');

  app.db = router.db;
  app.use(history());
  app.use(jsonServer.defaults({ static: '.' }));
  app.use(nocache());
  app.use(busboy());
  app.use(jsonServer.bodyParser);
  app.use(middleware);
  app.use('/login', loginRoutes)
  app.use('/signup', signupRoutes)
  app.use(jsonServer.rewriter({
    '/users/*': '/600/users/$1',
  }));
  app.use(auth);
  app.use('/boards', boardRoutes)
  app.use('/lists', listRoutes)
  app.use('/cards', cardRoutes)
  app.use('/users', userRoutes)
  app.use('/reset', resetRoutes)
  app.use('/location', locationRoutes)

  app.use(router);

  const server = app.listen(SERVER);
  // const io = require('socket.io')(server);

  // io.on('connection', (socket) => {
  //   socket.on('boardCreated', (message) => {
  //     io.emit('boardCreated', message);
  //   });
  //   socket.on('boardsState', (message) => {
  //     io.emit('boardsState', message);
  //   });
  //   socket.on('boardDeleted', (id) => {
  //     io.emit('boardDeleted', id);
  //   });
  //   socket.on('boardUpdate', (id, message) => {
  //     io.emit('boardUpdate', id, message);
  //   });
  //   socket.on('listCreated', (boardId, message) => {
  //     io.emit('listCreated', boardId, message);
  //   });
  //   socket.on('listUpdated', (id, message) => {
  //     io.emit('listUpdated', id, message);
  //   });
  //   socket.on('listDeleted', (id) => {
  //     io.emit('listDeleted', id);
  //   });
  //   socket.on('cardCreated', (listId, message) => {
  //     io.emit('cardCreated', listId, message);
  //   });
  //   socket.on('cardUpdated', (id, message) => {
  //     io.emit('cardUpdated', id, message);
  //   });
  //   socket.on('cardDeleted', (id, message) => {
  //     io.emit('cardDeleted', id, message);
  //   });

  // });
  return null;
}

export const createServer = (): PluginOption => {
  return startServer()
}