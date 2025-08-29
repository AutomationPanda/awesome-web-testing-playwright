import Card from '@/typings/card';
import List from '@/typings/list';
import axios from 'axios';

export const deleteCard = async function (this: any, card: Card) {
  const { id, listId } = card;
  await axios.delete(`/api/cards/${id}`);
  const listIndex = this.lists.findIndex((list: List) => list.id === listId);
  this.lists[listIndex].cards = this.lists[listIndex].cards.filter((item: Card) => item.id !== id);
  this.activeCard = {};
  this.cardModule = false;
  this.showNotification('Card was deleted', false);
};
