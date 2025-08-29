import Card from './card';

interface List {
  boardId: number;
  name: string;
  id: number;
  order: number;
  created: string;
  cards: Card[];
}

export default List;
