import axios from 'axios';

export const oauthLogin = async function (this: any, jwt: string) {
  await axios
    .post('/api/login', { jwt })
    .then(({ data }) => {
      const token = data.accessToken;
      const email = data.user.email;
      const id = data.user.id;
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      document.cookie = `auth_token=${token}`;
      this.activeUser.id = id;
      this.activeUser.email = email;
      this.activeUser.accessToken = token;
      this.user(this.activeUser.id);
    })
    .catch(({ response }) => {
      document.cookie = 'auth_token=;expires=Thu, 01 Jan 1970 00:00:00 GMT';
      this.showNotification(response.data, true);
    });
};
