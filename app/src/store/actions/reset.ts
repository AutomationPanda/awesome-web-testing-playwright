import axios from 'axios';

export const reset = async function (this: any) {
  axios
    .post('/api/reset')
    .then(() => {
      this.activeCard = {};
      this.boardList.all = [];
      this.cardModule = false;
      this.showTools = false;
      this.showNotification('All data was deleted', false);
    })
    .catch((e) => {
      console.log(e);
      this.showNotification('Data could not be deleted', true);
    });
};
