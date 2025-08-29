import List from '@/typings/list';

export const sortLists = async function (this: any) {
  this.lists.forEach((list: List, index: number) => {
    this.patchList(list, { order: index });
  });
};
