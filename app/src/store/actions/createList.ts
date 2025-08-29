import Board from '@/typings/board';
import axios from 'axios';

export const createList = async function (this: any, boardId: Board['id'], name: string) {
  axios
    .post('/api/lists', { boardId, name, order: this.lists.length })
    .then(({ data }) => {
      data.cards = [];
      this.lists.push(data);
    })
    .catch(() => {
      this.showNotification('List was not created', true);
    });
};
