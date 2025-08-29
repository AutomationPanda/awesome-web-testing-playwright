import List from '@/typings/list';
import axios from 'axios';

export const deleteList = async function (this: any, listId: List['id']) {
  await axios.delete(`/api/lists/${listId}`);
  this.lists = this.lists.filter((item: List) => item.id !== listId);
  this.sortLists();
};
