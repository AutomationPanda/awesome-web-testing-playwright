import axios from 'axios';

export const user = async function (this: any, id: number) {
  await axios
    .get(`/api/users/${id}`)
    .then(({ data }) => {
      this.showNotification('User is logged in', false);
      this.activeUser.loggedIn = true;
      this.activeUser.email = data.email;
      this.activeUser.id = data.id;
    })
    .catch(() => {
      this.showNotification('User is not authorized', true);
      document.cookie = 'auth_token=;expires=Thu, 01 Jan 1970 00:00:00 GMT';
    });
};
