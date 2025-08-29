import Board from '../views/Board.vue';
import BoardList from '@/components/boardList/BoardList.vue';
import Login from '@/components/Login.vue';
import NotFound from '@/components/NotFound.vue';
import Signup from '@/components/Signup.vue';
import Pricing from '@/components/Pricing.vue';

export const routes = [
  {
    component: BoardList,
    name: 'BoardList',
    path: '/',
  },
  {
    component: Login,
    name: 'Login',
    path: '/login',
  },
  {
    component: Signup,
    name: 'Signup',
    path: '/signup',
  },
  {
    component: Pricing,
    name: 'Pricing',
    path: '/pricing',
  },
  {
    component: Board,
    name: 'Board',
    path: '/board/:board',
  },
  {
    component: NotFound,
    path: '/:pathMatch(.*)*',
    name: 'Page not found',
  },
];
