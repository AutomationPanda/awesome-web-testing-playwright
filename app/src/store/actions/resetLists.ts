import axios from 'axios';

export const resetLists = async function (this: any) {
  await axios.delete('/api/lists');
  this.activeCard = {};
  this.cardModule = false;
  this.lists = [];
  this.showNotification('All lists were deleted', false);
};
