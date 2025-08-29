import Board from '@/typings/board';
import axios from 'axios';

export const deleteBoard = async function (this: any, boardId: Board['id']) {
  axios
    .delete(`/api/boards/${boardId}`)
    .then(() => {
      this.showNotification('Board was deleted', false);
    })
    .catch((e) => {
      console.log(e);
      this.showNotification('Board could not be deleted', true);
    });
};
