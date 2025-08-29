import axios from 'axios';

export const signup = async function (this: any, email: string, password: string, welcomeEmail: boolean) {
  await axios
    .post('/api/signup', { email, password, welcomeEmail })
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
      this.showNotification('User was successfully created', false);

      welcomeEmail &&
        axios.post('/api/welcomeemail', {
          email,
        });
    })
    .catch((e) => {
      this.showNotification(e.response.data, true);
    });
};
