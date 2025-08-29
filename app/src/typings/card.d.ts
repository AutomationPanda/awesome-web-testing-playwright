interface Card {
  boardId: number;
  listId: number;
  name: string;
  description: string;
  id: number;
  image: string | null;
  created: string;
  deadline: string;
  completed: boolean;
  order: number;
}

export default Card;
