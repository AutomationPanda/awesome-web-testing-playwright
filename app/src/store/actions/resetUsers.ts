import axios from 'axios';

export const resetUsers = async function (this: any) {
  await axios.delete('/api/users');
  this.activeUser.loggedIn = false;
  this.activeUser.email = '';
  axios.defaults.headers.common['Authorization'] = '';
  document.cookie = 'auth_token=;expires=Thu, 01 Jan 1970 00:00:00 GMT';
  this.showNotification('All users were deleted', false);
};
