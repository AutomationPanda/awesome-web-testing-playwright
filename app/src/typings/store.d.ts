import { AxiosResponse } from 'axios';
import 'pinia';
import Board from './board';
import Card from './card';
import List from './list';

declare module 'pinia' {
  export interface PiniaCustomStateProperties<S> {
    board: Board;
    redirectBoardId: Board['id'];
    lists: List[] | any;
    loading: boolean;
    loadingListCards: Record<any, string>;
    loadingError: {
      show: boolean;
      status: number;
      message: string;
      tooLong: boolean;
    };
    createListInput: boolean;
    cardModule: boolean;
    activeCard: Card;
    notification: {
      error: boolean;
      show: boolean;
      message: string;
    };
    boardList: {
      all: Board[];
    };
    activeUser: {
      loggedIn: boolean;
      email: string;
      id: number;
      accessToken: string;
    };
    signupForm: {
      email: string;
      password: string;
      welcomeEmail: boolean;
    };
    loginForm: {
      email: string;
      password: string;
    };
    showTools: boolean;
    showSearch: boolean;
    searchResults: Cards[];
  }
}
