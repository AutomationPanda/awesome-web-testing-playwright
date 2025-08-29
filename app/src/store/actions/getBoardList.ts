import axios from 'axios';

export const getBoardList = async function (this: any) {
  this.loadingError.show = false;
  this.loadingError.message = '';
  this.loadingError.status = '';
  setTimeout(() => {
    this.loadingError.tooLong = true;
  }, 3000);
  axios
    .get('/api/boards')
    .then(({ data }) => {
      this.boardList.all = data;
      this.loading = false;
    })
    .catch(({ response }) => {
      this.loading = false;
      this.loadingError.show = true;
      if (response) {
        this.loadingError.message = response.data.message;
        this.loadingError.status = response.status;
      }
    });
};
