import { defineStore } from 'pinia';
import { createBoard } from './actions/createBoard';
import { getBoardDetail } from './actions/getBoardDetail';
import { getBoardList } from './actions/getBoardList';
import { patchCard } from './actions/patchCard';
import { uploadFile } from './actions/uploadFile';
import { deleteCard } from './actions/deleteCard';
import { deleteList } from './actions/deleteList';
import { patchList } from './actions/patchList';
import { createCard } from './actions/createCard';
import { createList } from './actions/createList';
import { sortLists } from './actions/sortLists';
import { deleteBoard } from './actions/deleteBoard';
import { signup } from './actions/signup';
import { login } from './actions/login';
import { user } from './actions/user';
import { reset } from './actions/reset';
import { showNotification } from './actions/showNotification';
import { showCardModule } from './actions/showCardModule';
import { resetBoards } from './actions/resetBoards';
import { resetLists } from './actions/resetLists';
import { resetCards } from './actions/resetCards';
import { resetUsers } from './actions/resetUsers';
import { patchBoard } from './actions/patchBoard';
import { toggleTools } from './actions/toggleTools';
import { toggleSearch } from './actions/toggleSearch';
import { searchCard } from './actions/searchCard';
import { oauthLogin } from './actions/oauthLogin';
import { oauthSignup } from './actions/oauthSignup';
import { getLocation } from './actions/getLocation';
import Board from '@/typings/board';

export const useStore = defineStore({
  id: 'store',
  state() {
    return {
      board: {},
      redirectBoardId: 0,
      lists: [],
      loading: true,
      loadingListCards: {},
      loadingError: {
        show: false,
        status: -1,
        message: '',
        tooLong: false,
      },
      createListInput: true,
      cardModule: false,
      activeCard: {},
      notification: {
        error: false,
        show: false,
        message: '',
      },
      boardList: {
        all: [],
      },
      activeUser: {
        accessToken: '',
        email: '',
        id: 0,
        loggedIn: false,
      },
      signupForm: {
        email: '',
        password: '',
        welcomeEmail: false,
      },
      loginForm: {
        email: '',
        password: '',
      },
      pricing: {
        activePlan: 2,
        location: 'us',
        currency: 'USD',
        discountEligible: false,
        discountAmount: 0,
      },
      showTools: false,
      showSearch: false,
      searchResults: [],
    };
  },
  actions: {
    // board actions
    createBoard,
    getBoardDetail,
    getBoardList,
    patchBoard,
    deleteBoard,

    // list actions
    createList,
    deleteList,
    patchList,
    sortLists,

    // card actions
    createCard,
    patchCard,
    deleteCard,
    uploadFile,

    // user actions
    signup,
    login,
    oauthLogin,
    oauthSignup,
    user,

    // other actions
    showNotification,
    showCardModule,
    getLocation,

    // api tools
    toggleTools,

    // search functionality
    toggleSearch,
    searchCard,

    // reset actions
    reset,
    resetBoards,
    resetLists,
    resetCards,
    resetUsers,
  },
  getters: {
    starred: (state): Board[] => {
      return state.boardList.all?.filter((board: Board) => board.starred === true);
    },
    allBoards: (state): Board[] => {
      return state.boardList.all?.filter((board: Board) => board.starred === false);
    },
  },
});
