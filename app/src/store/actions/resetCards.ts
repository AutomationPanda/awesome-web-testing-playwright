import List from '@/typings/list';
import axios from 'axios';

export const resetCards = async function (this: any) {
  await axios.delete('/api/cards');
  this.activeCard = {};
  this.cardModule = false;
  this.lists.forEach((list: List) => {
    list.cards = [];
  });
  this.showNotification('All cards were deleted', false);
};
