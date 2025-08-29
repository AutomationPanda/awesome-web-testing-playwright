import axios from 'axios';

export const login = async function (this: any, email: string, password: string) {
  await axios
    .post('/api/login', { email, password })
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
      this.showNotification(response.data, true);
    });
};
