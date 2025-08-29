import { useRoute } from 'vue-router';

import Board from '@/typings/board';
import Card from '@/typings/card';
import List from '@/typings/list';
import axios, { AxiosError } from 'axios';

export const getBoardDetail = async function (this: any, id: Board['id']) {
  const route = useRoute();

  this.loading = true;

  try {
    const board = await axios.get(`/api/boards/${id}`);
    this.board = board.data;

    const lists = await axios.get(`/api/lists?boardId=${id}`);
    lists.data.sort((a: List, b: List) => {
      return a.order - b.order;
    });
    this.lists = lists.data;
    if (lists.data.length) this.createListInput = false;

    // if there are no lists, don’t fetch cards
    this.lists.forEach((list: List, index: number) => {
      this.loadingListCards[this.lists[index].id] = true;
      axios.get(`/api/cards?listId=${list.id}`).then(({ data }) => {
        data.sort((a: Card, b: Card) => {
          return a.order - b.order;
        });
        this.lists[index].cards = [];
        this.lists[index].cards.push(...data);
        this.loadingListCards[this.lists[index].id] = false;
      });
    });

    const qs: any = route.query?.card;
    if (qs !== undefined) {
      this.showCardModule(qs, true);
    }
    this.loading = false;
  }
 catch (err) {
    const { response } = err as AxiosError<any>;
    this.loading = false;
    this.loadingError.show = true;
    this.loadingError.message = response?.data?.message;
    this.loadingError.status = response?.status;
  }
};
